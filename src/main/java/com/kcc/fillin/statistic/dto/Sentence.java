package com.kcc.fillin.statistic.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class Sentence {
    private String content;
    private int offset;
    private int length;
    private String sentiment;
    private Confidence confidence;
    private List<Highlight> highlights;
}
