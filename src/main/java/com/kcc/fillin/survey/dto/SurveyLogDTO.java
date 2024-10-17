package com.kcc.fillin.survey.dto;

import lombok.*;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SurveyLogDTO {
    private Long logSeq;        // 설문 로그 ID
    private Long surveySeq;     // 설문 ID
//    private String occurDate;   // 발생일자 (응답일자)
    private LocalDateTime startDate;   // 설문 시작일자
    private LocalDateTime endDate;     // 설문 종료일자
    private Long responseTime;  // 응답 시간 (ms)
}
