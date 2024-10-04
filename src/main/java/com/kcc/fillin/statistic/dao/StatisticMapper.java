package com.kcc.fillin.statistic.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kcc.fillin.statistic.dto.HitsDTO;
import com.kcc.fillin.statistic.dto.QuantitativeResponse;

@Mapper
public interface StatisticMapper {
	int selectTargetCount(Long surveyId);

	int selectParticipantsCount(Long surveyId);

	List<HitsDTO> selectHits(Long surveyId);

	List<QuantitativeResponse> selectQuantitativeList(Long surveyId);

}