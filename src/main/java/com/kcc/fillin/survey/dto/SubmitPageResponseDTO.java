package com.kcc.fillin.survey.dto;

import com.kcc.fillin.survey.domain.SurveyVO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SubmitPageResponseDTO {
    private SurveyVO surveyVO;
    private PageDTO pageDTO;

    public SubmitPageResponseDTO(SurveyVO findSurvey, PageDTO page) {
        this.surveyVO = findSurvey;
        this.pageDTO = page;
    }
}
