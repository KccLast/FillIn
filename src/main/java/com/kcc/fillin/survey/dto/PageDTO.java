package com.kcc.fillin.survey.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageDTO {
    private int curPage;
    private int amount = 5;
    private int totalCnt;
    private int end;

    private String surveyUrl;

    public PageDTO( Integer curPage, String surveyUrl) {
        this.curPage = curPage;
        this.surveyUrl = surveyUrl;
    }
    public boolean getPrev(){
        return curPage -1 >0;
    }
    public boolean getNext(){
        return curPage + 1 < end;
    }

    public void setEnd(int totalCnt){
        this.end = (int)Math.ceil((double)totalCnt/amount);
    }

}
