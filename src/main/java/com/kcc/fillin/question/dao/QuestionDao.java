package com.kcc.fillin.question.dao;

import org.apache.ibatis.annotations.Mapper;

import com.kcc.fillin.question.domain.QuestionItemVO;
import com.kcc.fillin.question.domain.QuestionVO;
import com.kcc.fillin.question.dto.UpdateQuestionRequest;

@Mapper
public interface QuestionDao {

	boolean insertQuestion(QuestionVO questionVO);

	int insertQuestionItem(QuestionItemVO questionItemVO);

	boolean updateQuestion(UpdateQuestionRequest up);
}
