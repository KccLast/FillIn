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

    private double getMaxConfidence() {
        return Math.max(this.negative,Math.max(this.neutral,this.positive));
    }
    public String getMaxConfidenceName(){
        double maxConfidence = getMaxConfidence();
        if(this.neutral == maxConfidence){
            return "중립";
        }else if(this.positive == maxConfidence) {
            return "긍정";
        }else{
            return "부정";
        }
    }
}






