package com.kcc.fillin.statistic.dto;



import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Highlight {
    @JsonProperty("offset")
    private int offset;

    @JsonProperty("length")
    private int length;
}
