package com.kcc.fillin.statistic.dao;

import java.util.List;

import com.kcc.fillin.statistic.dto.AnswerDTO;
import org.apache.ibatis.annotations.Mapper;

import com.kcc.fillin.statistic.dto.HitsDTO;
import com.kcc.fillin.statistic.dto.QualitativeResponse;
import com.kcc.fillin.statistic.dto.QuantitativeResponse;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface StatisticMapper {
    int selectTargetCount(Long surveyId);

    int selectParticipantsCount(Long surveyId);

    List<HitsDTO> selectHits(Long surveyId);

    List<QuantitativeResponse> selectQuantitativeList(Long surveyId);

    List<QualitativeResponse> selectQualitativeList(Long surveyId);

    //키워드분석

    // 키워드를 포함하는 Answer 데이터 검색
    List<AnswerDTO> findByContentsContaining(@Param("keyword") String keyword);


}