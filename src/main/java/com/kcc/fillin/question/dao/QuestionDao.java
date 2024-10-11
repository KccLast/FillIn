package com.kcc.fillin.question.dao;

import com.kcc.fillin.question.domain.QuestionItemVO;
import com.kcc.fillin.question.domain.QuestionVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface QuestionDao {

    boolean insertQuestion(QuestionVO questionVO);

    int insertQuestionItem(QuestionItemVO questionItemVO);
}
