package com.kcc.fillin.statistic.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
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