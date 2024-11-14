package com.kcc.fillin.statistic.service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
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

	// @Override
	// public List<ClusterAnswerResponse> getQuantitativeAnswer(QuantitativeAnswersRequest quantitativeAnswersRequest) {
	//
	// 	List<Long> participantSeqList = quantitativeAnswersRequest.getClusterList().stream()
	// 		.flatMap(cluster -> cluster.getParticipantList().stream())
	// 		.collect(Collectors.toList());
	//
	// 	List<ClusterAnswerResponse> responseList = statisticMapper.selectQuantitativeAnswerList(
	// 		quantitativeAnswersRequest.getSurveySeq(), participantSeqList);
	//
	// 	// 1. 클러스터별 참여자 리스트 맵핑하기
	// 	Map<Long, List<Long>> clusterToParticipantsMap = quantitativeAnswersRequest.getClusterList().stream()
	// 		.collect(Collectors.toMap(
	// 			QuantitativeAnswersRequest.ClusterDto::getClusterId,
	// 			QuantitativeAnswersRequest.ClusterDto::getParticipantList
	// 		));
	//
	// 	// 결과 저장용 리스트 초기화
	// 	List<Map<String, Object>> clusterCountLogs = new ArrayList<>();
	//
	// 	// 2. responseList에서 각 answerList 응답 항목에 대해 클러스터별 응답자 수 집계
	// 	for (ClusterAnswerResponse response : responseList) {
	// 		// Map<Long, Long> clusterMap = new HashMap<>(); // 항목 번호, 클러스터 번호
	//
	// 		for (ClusterAnswerDto answer : response.getAnswerList()) {
	// 			// 클러스터별 응답자 수를 담을 리스트 초기화
	// 			Map<Long, Long> clusterCount = new HashMap<>();
	//
	// 			// 각 클러스터에 대해 응답 항목에 해당하는 참여자 수 집계
	// 			for (Map.Entry<Long, List<Long>> entry : clusterToParticipantsMap.entrySet()) {
	// 				Long clusterId = entry.getKey();
	// 				List<Long> participants = entry.getValue();
	//
	// 				// 해당 클러스터의 참여자 수를 계산하여 집계
	// 				long participantCount = participants.stream()
	// 					.filter(participantSeq -> answer.getClusterList().contains(participantSeq))
	// 					.count();
	//
	// 				// 참여자 수가 0보다 크면 clusterCount에 추가
	// 				if (participantCount > 0) {
	// 					clusterCount.put(clusterId, participantCount);
	// 				}
	// 			}
	//
	// 			// 최대 응답자 수를 가진 클러스터만 남기기 위한 로직
	// 			// long maxCount = clusterCount.values().stream().max(Long::compare).orElse(0L);
	// 			// Set<Long> maxClusters = clusterCount.entrySet().stream()
	// 			// 	.filter(entry -> entry.getValue() == maxCount)
	// 			// 	.map(Map.Entry::getKey)
	// 			// 	.collect(Collectors.toSet());
	//
	// 			// 현재 응답 항목에 대한 로그 데이터를 Map으로 만들어 clusterCountLogs에 추가
	// 			Map<String, Object> logData = new HashMap<>();
	// 			logData.put("questionOrderNum", response.getQuestionOrderNum());
	// 			logData.put("answerOrderNum", answer.getAnswerOrderNum());
	// 			logData.put("clusterCount", new HashMap<>(clusterCount)); // clusterCount 복사하여 저장
	//
	// 			clusterCountLogs.add(logData);
	//
	// 			// 클러스터별 응답자 수 결과를 `clusterCount`로 설정 (JSON 응답에 포함)
	// 			// answer.setClusterCount(clusterCount);
	// 			log.info(response.getQuestionOrderNum() + "번 질문 : " + answer.getAnswerOrderNum() + "번 항목 : "
	// 				+ clusterCount.toString());
	//
	// 		}
	// 	}
	//
	// 	// clusterCountLogs에 저장된 내용 확인
	// 	log.info("응답자 수 클러스터 집계 결과: " + clusterCountLogs);
	//
	// 	log.info(responseList.toString());
	//
	// 	return responseList;
	// }

	@Override
	public List<ClusterAnswerResponse> getQuantitativeAnswer(QuantitativeAnswersRequest quantitativeAnswersRequest) {

		List<Long> participantSeqList = quantitativeAnswersRequest.getClusterList().stream()
			.flatMap(cluster -> cluster.getParticipantList().stream())
			.collect(Collectors.toList());

		List<ClusterAnswerResponse> responseList = statisticMapper.selectQuantitativeAnswerList(
			quantitativeAnswersRequest.getSurveySeq(), participantSeqList);

		// 1. 클러스터별 참여자 리스트 맵핑하기
		Map<Long, List<Long>> clusterToParticipantsMap = quantitativeAnswersRequest.getClusterList().stream()
			.collect(Collectors.toMap(
				QuantitativeAnswersRequest.ClusterDto::getClusterId,
				QuantitativeAnswersRequest.ClusterDto::getParticipantList
			));

		log.info("mapper 결과 : " + responseList.toString());
		log.info("mapping 결과 : " + clusterToParticipantsMap.toString());

		// 결과 저장용 리스트 초기화
		List<Map<Integer, Map<Integer, Map<Long, Integer>>>> clusterCountLogs = new ArrayList<>();

		// 2. responseList에서 각 answerList 응답 항목에 대해 클러스터별 응답자 수 집계
		for (ClusterAnswerResponse response : responseList) {
			// Map<Long, Long> clusterMap = new HashMap<>(); // 항목 번호, 클러스터 번호
			Map<Integer, Map<Integer, Map<Long, Integer>>> logData = new HashMap<>();

			logData.put(response.getQuestionOrderNum(), new HashMap<>());
			log.info("response == {}", response);
			for (ClusterAnswerDto answer : response.getAnswerList()) {
				log.info("answer == {}", answer);
				// 클러스터별 응답자 수를 담을 리스트 초기화
				Map<Long, Integer> clusterCount = new HashMap<>();

				logData.get(response.getQuestionOrderNum()).put(answer.getAnswerOrderNum(), clusterCount);
				// 각 클러스터에 대해 응답 항목에 해당하는 참여자 수 집계
				for (Map.Entry<Long, List<Long>> entry : clusterToParticipantsMap.entrySet()) {
					log.info("entry : " + entry);
					Long clusterId = entry.getKey();
					List<Long> participants = entry.getValue();

					// 해당 클러스터의 참여자 수를 계산하여 집계
					Long participantCount = participants.stream()
						.filter(participantSeq -> answer.getClusterList().contains(participantSeq))
						.count();
					log.info("{}", participantCount);
					// 참여자 수가 0보다 크면 clusterCount에 추가
					if (participantCount > 0) {

						clusterCount.put(clusterId, participantCount.intValue());
					}
				}

				// 최대 응답자 수를 가진 클러스터만 남기기 위한 로직
				// long maxCount = clusterCount.values().stream().max(Long::compare).orElse(0L);
				// Set<Long> maxClusters = clusterCount.entrySet().stream()
				// 	.filter(entry -> entry.getValue() == maxCount)
				// 	.map(Map.Entry::getKey)
				// 	.collect(Collectors.toSet());

				// 현재 응답 항목에 대한 로그 데이터를 Map으로 만들어 clusterCountLogs에 추가
				//Map<String, Object> logData = new HashMap<>();
				//logData.put("questionOrderNum", response.getQuestionOrderNum());
				//logData.put("answerOrderNum", answer.getAnswerOrderNum());
				//logData.put("clusterCount", new HashMap<>(clusterCount)); // clusterCount 복사하여 저장

				// 클러스터별 응답자 수 결과를 `clusterCount`로 설정 (JSON 응답에 포함)
				// answer.setClusterCount(clusterCount);
				log.info(response.getQuestionOrderNum() + "번 질문 : " + answer.getAnswerOrderNum() + "번 항목 : "
					+ clusterCount.toString());

			}
			clusterCountLogs.add(logData);
		}
		// List<Map<Integer, Map<Integer, Map<Long, Long>>>> resultLogs = new ArrayList<>();
		//
		// // 동일한 answerOrderNum에 대해 각 클러스터별 최댓값만 남기기 위한 로직
		// for (Map<Integer, HashMap> questionMap : clusterCountLogs) {
		// 	Map<Integer, Map<Long, Long>> combinedQuestionMap = new HashMap<>();
		//
		// 	for (Map.Entry<Integer, HashMap> questionEntry : questionMap.entrySet()) {
		// 		Integer questionOrderNum = questionEntry.getKey();
		// 		Map<Integer, Map<Long, Long>> answerMap = questionEntry.getValue();
		//
		// 		// 동일한 응답 항목에 대해 최댓값을 유지하는 새로운 map 생성
		// 		for (Map.Entry<Integer, Map<Long, Long>> answerEntry : answerMap.entrySet()) {
		// 			Integer answerOrderNum = answerEntry.getKey();
		// 			Map<Long, Long> clusterCounts = answerEntry.getValue();
		//
		// 			// 해당 answerOrderNum에서 최대 응답 수를 가진 clusterId 찾기
		// 			Long maxClusterId = null;
		// 			Long maxCount = 0L;
		//
		// 			for (Map.Entry<Long, Long> clusterEntry : clusterCounts.entrySet()) {
		// 				if (clusterEntry.getValue() > maxCount) {
		// 					maxCount = clusterEntry.getValue();
		// 					maxClusterId = clusterEntry.getKey();
		// 				}
		// 			}
		//
		// 			// maxClusterId와 maxCount만 유지
		// 			Map<Long, Long> maxClusterMap = new HashMap<>();
		// 			if (maxClusterId != null) {
		// 				maxClusterMap.put(maxClusterId, maxCount);
		// 			}
		//
		// 			combinedQuestionMap.put(answerOrderNum, maxClusterMap);
		// 		}
		// 	}

		// 현재 질문에 대한 결과를 최종 결과 리스트에 추가
		// 	resultLogs.add(Collections.singletonMap(
		// 		clusterCountLogs.indexOf(questionMap) + 1, combinedQuestionMap));
		// }

		// System.out.println("최댓값만 남긴 결과: " + resultLogs);
		log.info("응답자 수 클러스터 집계 결과: " + clusterCountLogs);

		for (ClusterAnswerResponse response : responseList) {
			for (ClusterAnswerDto answer : response.getAnswerList()) {
				answer.setClusterList(new ArrayList<>()); // clusterList를 빈 리스트로 초기화
			}
		}

		for (Map<Integer, Map<Integer, Map<Long, Integer>>> map : clusterCountLogs) {
			log.info(map.toString());

			for (Map.Entry<Integer, Map<Integer, Map<Long, Integer>>> questionInner : map.entrySet()) {
				Map<Integer, Map<Long, Integer>> questionInnerValue = questionInner.getValue();

				Map<Long, Integer[]> tmpList = new HashMap<>();

				for (Map.Entry<Integer, Map<Long, Integer>> answerInner : questionInnerValue.entrySet()) {
					Map<Long, Integer> answerInnerValue = answerInner.getValue();

					for (Map.Entry<Long, Integer> clInner : answerInnerValue.entrySet()) {

						Long clusterId = clInner.getKey();
						Integer count = clInner.getValue();
						if (tmpList.containsKey(clusterId)) {
							Integer[] arr = tmpList.get(clusterId);
							if (arr[0] < count) {
								arr[0] = count;
								arr[1] = answerInner.getKey();

							}
						} else {
							tmpList.put(clusterId, new Integer[] {count, answerInner.getKey()});
						}
					}

				}
				boolean flag = true;
				for (Map.Entry<Long, Integer[]> tm : tmpList.entrySet()) {
					log.info("id = {} array = {}", tm.getKey(), Arrays.toString(tm.getValue()));
					// 현재 questionInner.getKey()
					Integer questionOrderNum = questionInner.getKey();
					Long clusterId = tm.getKey();
					Integer answerOrderNum = tm.getValue()[1];

					for (ClusterAnswerResponse car : responseList) {
						if (car.getQuestionOrderNum().equals(questionInner.getKey())) {
							for (ClusterAnswerDto adt : car.getAnswerList()) {
								if (adt.getAnswerOrderNum().equals(tm.getValue()[1])) {

									adt.getClusterList().add(tm.getKey());

								}
							}
						}
					}

				}

				// log.info("tmpList {}", tmpList);
			}

		}

		//여기서 담아가기
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
//	private HttpResponse<String> sendSentimentRequest(String sentence) throws IOException, InterruptedException {
//		HttpClient client = HttpClient.newHttpClient();
//		HttpRequest request = HttpRequest.newBuilder()
//			.uri(URI.create("https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze"))
//			.header("Content-Type", "application/json")
//			.header("X-NCP-APIGW-API-KEY-ID", client_id)
//			.header("X-NCP-APIGW-API-KEY", client_secret)
//			.POST(HttpRequest.BodyPublishers.ofString("{\"content\":\"" + sentence + "\"}"))
//			.build();
//
//		return client.send(request, HttpResponse.BodyHandlers.ofString());
//	}
	private HttpResponse<String> sendSentimentRequest(String sentence) {
		HttpClient client = HttpClient.newHttpClient();
		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze"))
				.header("Content-Type", "application/json")
				.header("X-NCP-APIGW-API-KEY-ID", client_id)
				.header("X-NCP-APIGW-API-KEY", client_secret)
				.POST(HttpRequest.BodyPublishers.ofString("{\"content\":\"" + sentence + "\"}"))
				.build();

		try {
			return client.send(request, HttpResponse.BodyHandlers.ofString());
		} catch (IOException | InterruptedException e) {
			System.err.println("HTTPS 요청 실패: " + e.getMessage());
			e.printStackTrace();
			return null;
		}
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
