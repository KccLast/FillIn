package com.kcc.fillin.statistic.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SentimentAnalysisResult {
    private Document document;
    private List<Sentence> sentences;

//    가중치 부여 후 수정
    public SentimentAnalysisResult(double avgPositive, double avgNeutral, double avgNegative) {
        this.document = new Document();


        Confidence confidence = new Confidence();
        confidence.setPositive(avgPositive);
        confidence.setNeutral(avgNeutral);
        confidence.setNegative(avgNegative);

        this.document.setConfidence(confidence);
    }

}