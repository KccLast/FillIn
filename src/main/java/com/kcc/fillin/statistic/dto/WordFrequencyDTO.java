package com.kcc.fillin.statistic.dto;

import lombok.*;

//키워드 분석, 워드 클라우드 생성을 위해 단어와 해당 빈도를 저장하는 DTO 클래스
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WordFrequencyDTO {
    private String word;
    private int frequency;


}
