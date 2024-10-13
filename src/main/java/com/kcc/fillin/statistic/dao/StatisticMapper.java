package com.kcc.fillin.statistic.dao;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kcc.fillin.statistic.dto.HitsDTO;
import com.kcc.fillin.statistic.dto.PostDateResponse;
import com.kcc.fillin.statistic.dto.QualitativeResponse;
import com.kcc.fillin.statistic.dto.QuantitativeResponse;

@Mapper
public interface StatisticMapper {
	PostDateResponse selectPostDate(Long surveyId);

	int selectTargetCount(Long surveyId);

	int selectParticipantsCount(Long surveySeq, LocalDate startDate, LocalDate endDate);

	List<HitsDTO> selectHits(Long surveySeq, LocalDate startDate, LocalDate endDate);

	List<QuantitativeResponse> selectQuantitativeList(Long surveySeq, LocalDate startDate, LocalDate endDate,
		Long questionSeq, String contents);

	List<QualitativeResponse> selectQualitativeList(Long surveySeq, LocalDate startDate, LocalDate endDate,
		Long questionSeq, String contents);

}