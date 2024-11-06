package com.kcc.fillin.statistic.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RegressionResponse {
    private String status;
    private List<Double> coefficients;
    private Double intercept;
    private List<Double> predictions;
}
