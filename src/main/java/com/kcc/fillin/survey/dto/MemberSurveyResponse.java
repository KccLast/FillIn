package com.kcc.fillin.survey.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@ToString
@Getter
@Setter
public class MemberSurveyResponse {
    private Long seq;
    private String name;
    private LocalDate createdAt;
    private LocalDate postDate;
    private LocalDate endDate;
}
