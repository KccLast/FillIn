package com.kcc.fillin.statistic.service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kcc.fillin.statistic.dao.StatisticMapper;
import com.kcc.fillin.statistic.dto.AnswerDTO;
import com.kcc.fillin.statistic.dto.ClusterAnswerDto;
import com.kcc.fillin.statistic.dto.ClusterAnswerResponse;
import com.kcc.fillin.statistic.dto.PostDateResponse;
import com.kcc.fillin.statistic.dto.QualitativeAnswerDTO;
import com.kcc.fillin.statistic.dto.QualitativeQuestionResponse;
import com.kcc.fillin.statistic.dto.QuantitativeAnswersRequest;
import com.kcc.fillin.statistic.dto.SentimentAnalysisResult;
import com.kcc.fillin.statistic.dto.StatisticSurveyResponse;
import com.kcc.fillin.statistic.dto.WordFrequencyDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class StatisticServiceImpl implements StatisticService {

	@Value("${api.clova.client_id}")
	private String client_id;
	@Value("${api.clova.client_secret}")
	private String client_secret;

	private final StatisticMapper statisticMapper;

	@Override
	public PostDateResponse getPostDate(Long surveyId) {
		return statisticMapper.selectPostDate(surveyId);
	}

	@Override
	public StatisticSurveyResponse getStatisticSurvey(Long surveyId, LocalDate startDate, LocalDate endDate,
		Long questionSeq, String contents) {

		return StatisticSurveyResponse.builder() // 참여자 수 그래프 데이터
			// 목표 인원
			.targetCount(statisticMapper.selectTargetCount(surveyId))
			// 참여 인원
			.participantsCount(statisticMapper.selectParticipantsCount(surveyId, startDate, endDate))
			// // 조회수
			.hitsResponseList(statisticMapper.selectHits(surveyId, startDate, endDate))
			// // 정량 평가 응답
			.quantitativeResponseList(
				statisticMapper.selectQuantitativeList(surveyId, startDate, endDate, questionSeq, contents))
			// // 정성 평가 응답
			.qualitativeResponseList(
				statisticMapper.selectQualitativeList(surveyId, startDate, endDate, questionSeq, contents))
			.build();
	}

	@Override
	public List<QualitativeQuestionResponse> getQualitativeQuestion(Long surveyId) {
		return statisticMapper.selectQualitativeQuestions(surveyId);
	}

	@Override
	public List<QualitativeAnswerDTO> getQualitativeAnswer(Long questionId) {
		return statisticMapper.selectQualitativeAnswerList(questionId);
	}

	@Override
	public List<ClusterAnswerResponse> getQuantitativeAnswer(QuantitativeAnswersRequest quantitativeAnswersRequest) {
		// // 1. participantSeq와 clusterId 매핑 정보 생성
		// Map<Long, Long> participantClusterMap = quantitativeAnswersRequest.getClusterList().stream()
		// 	.flatMap(cluster -> cluster.getAnswerList().stream()
		// 		.map(answer -> Map.entry(answer.getParticipantSeq(), cluster.getClusterId())))
		// 	.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

		// // 2. participantSeq 목록 생성
		// List<Long> participantSeqList = new ArrayList<>(participantClusterMap.keySet());
		//
		// // 3. statisticMapper에서 데이터 가져오기
		// List<ClusterAnswerResponse> responseList = statisticMapper.selectQuantitativeAnswerList(
		// 	quantitativeAnswersRequest.getSurveySeq(), participantSeqList);
		//
		// // 4. 각 ClusterAnswerResponse의 answerList에서 clusterList를 업데이트
		// for (ClusterAnswerResponse response : responseList) {
		// 	for (ClusterAnswerResponse.ClusterAnswerDto answer : response.getAnswerList()) {
		// 		// 응답 항목에 응답한 참여자들의 clusterId를 수집
		// 		List<Long> updatedClusterList = answer.getClusterList().stream()
		// 			.map(participantClusterMap::get)
		// 			.filter(Objects::nonNull)
		// 			.distinct()
		// 			.collect(Collectors.toList());
		//
		// 		// 업데이트된 clusterList 설정
		// 		answer.setClusterList(updatedClusterList);
		// 	}
		// }

		List<Long> participantSeqList = quantitativeAnswersRequest.getClusterList().stream()
			.flatMap(cluster -> cluster.getParticipantList().stream())
			.collect(Collectors.toList());

		List<ClusterAnswerResponse> responseList = statisticMapper.selectQuantitativeAnswerList(
			quantitativeAnswersRequest.getSurveySeq(), participantSeqList);

		// 각 응답 항목에 대해 클러스터 수집을 위한 Map 초기화
		// answerOrderNum, clusterId, clusterCount
		Map<Long, Map<Long, Long>> clusterAnswerCountMap = new HashMap<>();

		// 응답 항목을 순회하며 클러스터별 응답 수 집계
		for (ClusterAnswerResponse response : responseList) {
			for (ClusterAnswerDto answer : response.getAnswerList()) {
				for (Long clusterId : answer.getClusterList()) {

					// if()

					// 클러스터 별로 응답 카운트
					clusterAnswerCountMap
						.computeIfAbsent(answer.getAnswerOrderNum(), k -> new HashMap<>())
						.merge(clusterId, 1L, Long::sum);
				}

				// 클러스터 리스트를 비웁니다. (응답자 번호를 제거)
				answer.setClusterList(new ArrayList<>());
			}
		}

		// 각 응답 항목에 대해 가장 많이 선택된 클러스터 ID 찾기
		for (ClusterAnswerResponse response : responseList) {
			for (ClusterAnswerDto answer : response.getAnswerList()) {
				Long mostRespondedClusterId = null;
				Long maxCount = 0L;

				// 해당 응답 항목에 대한 클러스터 카운트를 확인
				Map<Long, Long> countMap = clusterAnswerCountMap.get(answer.getAnswerOrderNum());
				if (countMap != null) {
					for (Map.Entry<Long, Long> entry : countMap.entrySet()) {
						if (entry.getValue() > maxCount) {
							maxCount = entry.getValue();
							mostRespondedClusterId = entry.getKey();
						}
					}
				}

				// 가장 많이 선택된 클러스터 ID를 추가
				if (mostRespondedClusterId != null) {
					answer.getClusterList().add(mostRespondedClusterId);
				}
			}
		}

		// reqeust에 있는 clusterList 반복문 돌면서 질문 별로

		// 각 응답 항목에 대한 최다 참여 클러스터 ID 설정
		// for (ClusterAnswerResponse response : responseList) {
		// 	for (ClusterAnswerDto answer : response.getAnswerList()) {
		// 		Map<Long, Long> clusterCount = quantitativeAnswersRequest.getClusterList().stream()
		// 			.collect(Collectors.toMap(
		// 				QuantitativeAnswersRequest.ClusterDto::getClusterId,
		// 				cluster -> cluster.getAnswerList().stream()
		// 					.filter(a -> a.getAnswerSeq().equals(answer.getAnswerSeq()))
		// 					.count()
		// 			));
		//
		// 		Long maxClusterId = clusterCount.entrySet().stream()
		// 			.max(Map.Entry.comparingByValue())
		// 			.map(Map.Entry::getKey)
		// 			.orElse(null);
		//
		// 		answer.setClusterList(maxClusterId != null ? List.of(maxClusterId) : Collections.emptyList());
		// 	}
		// }

		// List<Long> participantSeqList = quantitativeAnswersRequest.getClusterList().stream()
		// 	.flatMap(cluster -> cluster.getAnswerList().stream())
		// 	.map(QuantitativeAnswersRequest.AnswerDto::getParticipantSeq)
		// 	.collect(Collectors.toList());
		//
		// List<ClusterAnswerResponse> responseList = statisticMapper.selectQuantitativeAnswerList(
		// 	quantitativeAnswersRequest.getSurveySeq(), participantSeqList);
		//
		// log.info(responseList.toString());

		return responseList;
	}

	//	키워드 분석
	@Override
	public List<AnswerDTO> findByKeyword(String keyword) {
		// StatisticMapper를 통해 데이터베이스에서 데이터를 가져옴
		return statisticMapper.findByContentsContaining(keyword);
	}

	@Override
	public List<WordFrequencyDTO> calculateWordFrequencies(String keyword) {
		List<AnswerDTO> answers = findByKeyword(keyword);

		// 빈도수 계산 로직 (예시)
		Map<String, Integer> frequencyMap = new HashMap<>();
		for (AnswerDTO answer : answers) {
			String[] words = answer.getContents().split("\\s+");
			for (String word : words) {
				frequencyMap.put(word, frequencyMap.getOrDefault(word, 0) + 1);
			}
		}

		// 빈도 데이터를 WordFrequency 객체로 변환
		return frequencyMap.entrySet().stream()
			.map(entry -> new WordFrequencyDTO(entry.getKey(), entry.getValue()))
			.collect(Collectors.toList());
	}

	//	감정분석
  /*  @Override
    public SentimentAnalysisResult analyzeSentiment(String text) {

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze"))
                .header("Content-Type", "application/json")
                .header("X-NCP-APIGW-API-KEY-ID", client_id)
                .header("X-NCP-APIGW-API-KEY", client_secret)
                .POST(HttpRequest.BodyPublishers.ofString("{\"content\":\"" + text+ "\"}"))
                .build();


        try {

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("response.body() = " + response.body());
            return parseSentimentResponse(response.body());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            // 여기서 적절한 오류 처리 로직을 추가하거나, 오류 정보를 리턴할 수 있다... 아오..
            return null;  // 예를 들어 null을 반환하거나, 오류 상태를 나타내는 SentimentAnalysisResult 객체를 반환할 수 있음
        }
    }


    private SentimentAnalysisResult parseSentimentResponse(String jsonResponse) {
       // ObjectMapper 인스턴스 생성
        ObjectMapper mapper = new ObjectMapper();
        try {
            SentimentAnalysisResult result = mapper.readValue(jsonResponse, SentimentAnalysisResult.class);
            System.out.println("Document Sentiment: " + result.getDocument().getSentiment());
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
*/
	//    가중치 부여 후 수정
	@Override
	public SentimentAnalysisResult analyzeSentiment(String text) {
		String[] sentences = splitSentences(text);

		double totalPositive = 0.0, totalNeutral = 0.0, totalNegative = 0.0;
		double totalWeight = 0.0;
		double positiveWeight = 1.5;
		double negativeWeight = 1.5;
		double neutralWeight = 0.8;
		// ��정 분석
		for (String sentence : sentences) {
			try {
				// 각 문장에 대해 감정 분석 요청
				HttpResponse<String> response = sendSentimentRequest(sentence);
				JSONObject jsonResponse = new JSONObject(response.body());
				JSONObject confidence = jsonResponse.getJSONObject("document").getJSONObject("confidence");

				// 문장 길이에 따른 가중치 설정
				double lengthWeight = sentence.length() > 100 ? 1.5 : 1.0;

				// 감정별 가중치 적용
				double weightedPositive = confidence.getDouble("positive") * positiveWeight * lengthWeight;
				double weightedNeutral = confidence.getDouble("neutral") * neutralWeight * lengthWeight;
				double weightedNegative = confidence.getDouble("negative") * negativeWeight * lengthWeight;

				// 로그 출력: 가중치와 감정 분석 결과 확인
				System.out.println("문장: " + sentence);
				System.out.println("문장 길이 가중치: " + lengthWeight);
				System.out.println("적용된 긍정 값: " + weightedPositive);
				System.out.println("적용된 중립 값: " + weightedNeutral);
				System.out.println("적용된 부정 값: " + weightedNegative);

				// 합산
				totalPositive += weightedPositive;
				totalNeutral += weightedNeutral;
				totalNegative += weightedNegative;

				totalWeight += lengthWeight;

			} catch (IOException | InterruptedException e) {
				e.printStackTrace();
			}
		}

		// 최종 감정 값 계산
		double avgPositive = totalPositive / totalWeight;
		double avgNeutral = totalNeutral / totalWeight;
		double avgNegative = totalNegative / totalWeight;

		System.out.println("최종 긍정: " + avgPositive + ", 최종 중립: " + avgNeutral + ", 최종 부정: " + avgNegative);

		return new SentimentAnalysisResult(avgPositive, avgNeutral, avgNegative);
	}

	// 감정 분석 API 요청 메서드
	private HttpResponse<String> sendSentimentRequest(String sentence) throws IOException, InterruptedException {
		HttpClient client = HttpClient.newHttpClient();
		HttpRequest request = HttpRequest.newBuilder()
			.uri(URI.create("https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze"))
			.header("Content-Type", "application/json")
			.header("X-NCP-APIGW-API-KEY-ID", client_id)
			.header("X-NCP-APIGW-API-KEY", client_secret)
			.POST(HttpRequest.BodyPublishers.ofString("{\"content\":\"" + sentence + "\"}"))
			.build();

		return client.send(request, HttpResponse.BodyHandlers.ofString());
	}

	// 가중치 적용 메서드
	private double getSentimentWeight(JSONObject confidence) {
		double positiveWeight = 1.5;
		double negativeWeight = 1.5;
		double neutralWeight = 1;
		double positiveConfidence = confidence.getDouble("positive") * positiveWeight;
		double neutralConfidence = confidence.getDouble("neutral") * neutralWeight;
		double negativeConfidence = confidence.getDouble("negative") * negativeWeight;

		// 가장 높은 가중치가 적용된 confidence 값 선택
		double maxConfidence = Math.max(positiveConfidence, Math.max(neutralConfidence, negativeConfidence));

		// 선택된 가중치가 0.8 이상일 때 1.5, 그렇지 않으면 1.0을 반환
		return maxConfidence >= 0.8 ? 1.5 : 1.0;
	}

	// 문장 분리 메서드 (쉼표와 마침표 기준)
	private String[] splitSentences(String text) {
		return text.split("(?<=[.,은는이가])");
	}

}
