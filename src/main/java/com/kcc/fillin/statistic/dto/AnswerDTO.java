package com.kcc.fillin.statistic.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

//키워드분석, 데이터베이스에서 가져온 설문 응답을 저장하는 엔티티(검색결과담기)

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AnswerDTO {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd a h:mm:ss")
    private Long seq;
    private Long questionSeq;
    private Long participantSeq;
    private String contents;
    private LocalDateTime answerDate;


}
