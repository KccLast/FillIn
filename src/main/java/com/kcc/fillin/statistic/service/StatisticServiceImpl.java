package com.kcc.fillin.statistic.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kcc.fillin.statistic.dao.StatisticMapper;
import com.kcc.fillin.statistic.dto.StatisticSurveyResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class StatisticServiceImpl implements StatisticService {

	private final StatisticMapper statisticMapper;

	@Override
	public StatisticSurveyResponse getStatisticSurvey(Long surveyId) {

		// log.info(statisticMapper.selectQuantitativeList(surveyId).toString());

		return StatisticSurveyResponse.builder() // 참여자 수 그래프 데이터
			// 목표 인원
			.targetCount(statisticMapper.selectTargetCount(surveyId))
			// 참여 인원
			.participantsCount(statisticMapper.selectParticipantsCount(surveyId))
			.hitsResponseList(statisticMapper.selectHits(surveyId))
			.quantitativeResponseList(statisticMapper.selectQuantitativeList(surveyId))
			.qualitativeResponseList(statisticMapper.selectQualitativeList(surveyId))
			.build();
	}
}
