package com.kcc.fillin.statistic.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Confidence {
    private double neutral;
    private double positive;
    private double negative;
}