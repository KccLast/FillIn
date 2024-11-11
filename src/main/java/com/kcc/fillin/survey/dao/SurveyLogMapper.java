package com.kcc.fillin.survey.dao;

import com.kcc.fillin.survey.dto.SurveyLogDTO;
import com.kcc.fillin.survey.dto.SurveyStatusDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Mapper
public interface SurveyLogMapper {


    List<SurveyLogDTO> findSurveyLogs(
            @Param("surveySeq") Long surveySeq,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    List<SurveyStatusDTO> findSurveyStatusCounts(
            @Param("surveySeq") Long surveySeq,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
}