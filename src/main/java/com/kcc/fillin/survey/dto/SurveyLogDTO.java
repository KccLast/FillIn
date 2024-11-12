package com.kcc.fillin.survey.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SurveyLogDTO {
    private Long answerSeq;          // 응답 번호
    private Long questionSeq;        // 질문 번호
    private Long participantSeq;     // 참여자 번호
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startDate; // 설문 시작일자
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endDate;   // 설문 종료일자
    private String responseTime;     // 응답 시간 (HH:mm:ss 형식)
    private Long surveySeq;


}
