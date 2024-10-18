package com.kcc.fillin.statistic.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class Document {
    private String sentiment;
    private Confidence confidence;
}
