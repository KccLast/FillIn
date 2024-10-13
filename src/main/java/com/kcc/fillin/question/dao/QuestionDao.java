package com.kcc.fillin.question.dao;

import com.kcc.fillin.question.dto.UpdateQuestionItemRequest;
import org.apache.ibatis.annotations.Mapper;

import com.kcc.fillin.question.domain.QuestionItemVO;
import com.kcc.fillin.question.domain.QuestionVO;
import com.kcc.fillin.question.dto.UpdateQuestionRequest;

@Mapper
public interface QuestionDao<T> {

	boolean insertQuestion(QuestionVO questionVO);

	int insertQuestionItem(QuestionItemVO questionItemVO);

	boolean updateQuestion(UpdateQuestionRequest up);

    boolean deleteAllQuestionItem(T item);

	boolean updateQuestionItem(UpdateQuestionItemRequest item);
}
