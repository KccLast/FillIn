package com.kcc.fillin.question.service;

import com.kcc.fillin.question.domain.QuestionVO;

import java.util.List;

public interface QuestionService {
    public boolean insertQuestionAndQuestionItem(List<QuestionVO> questionVOList);
}
