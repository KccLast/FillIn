package com.kcc.fillin.survey.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SurveyStatusDTO {
    private String status;    // 설문 상태 (설문 완료자, 빠른 응답자, 설문 이탈자)
    private Long count;       // 상태별 응답자 수
    private Double percentage; // 상태별 응답 비율
}
