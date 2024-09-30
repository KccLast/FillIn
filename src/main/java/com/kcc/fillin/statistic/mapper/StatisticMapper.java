package com.kcc.fillin.statistic.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StatisticMapper {
	int selectTargetCount(Long surveyId);

	int selectParticipantsCount(Long surveyId);

}