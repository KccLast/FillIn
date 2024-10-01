package com.kcc.fillin.statistic.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kcc.fillin.statistic.dto.HitsDTO;

@Mapper
public interface StatisticMapper {
	int selectTargetCount(Long surveyId);

	int selectParticipantsCount(Long surveyId);

	List<HitsDTO> selectHits(Long surveyId);

}