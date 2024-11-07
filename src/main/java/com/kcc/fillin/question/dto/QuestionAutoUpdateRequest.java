package com.kcc.fillin.question.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;
@Getter
@Setter
@ToString
public class QuestionAutoUpdateRequest {

    private Long seq; //surveySeq
    private Long ccSeq;
    private Long questionSeq; //questionSeq

    private Long questionItemSeq;
    private String name;
    private String description;
    private MultipartFile tb_file;
    private Long tb_file_Seq;
    private Character isEssential;
    private Integer order;

    public boolean isCcseqNotNull() {
        return ccSeq != null;
    }
}
