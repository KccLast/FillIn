package com.kcc.fillin.statistic.service;

import com.kcc.fillin.statistic.dto.AnswerDTO;
import com.kcc.fillin.statistic.dto.WordFrequencyDTO;
import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kcc.fillin.statistic.dao.StatisticMapper;
import com.kcc.fillin.statistic.dto.PostDateResponse;
import com.kcc.fillin.statistic.dto.StatisticSurveyResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class StatisticServiceImpl implements StatisticService {

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

	// @Override
	// public StatisticSurveyResponse getFilterStatisticSurvey(Long surveyId, LocalDate startDate, LocalDate endDate,
	// 	Long questionSeq, String contents) {
	//
	// 	// 조회 기간, 질문&문항
	//
	// 	return StatisticSurveyResponse.builder()
	// 		.targetCount(statisticMapper.selectTargetCount(surveyId));
	// }
  
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
}
