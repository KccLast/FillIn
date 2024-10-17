package com.kcc.fillin.survey.dao;

import com.kcc.fillin.survey.dto.SurveyLogDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface SurveyLogMapper {
    // 설문 로그를 쿼리하는 메서드 (페이징 추가)
    List<SurveyLogDTO> findSurveyLogs(@Param("startDate") LocalDate startDate,
                                      @Param("endDate") LocalDate endDate
                                      /*@Param("offset") int offset,
                                      @Param("size") int size*/);
}