package com.kcc.fillin.question.dao;

import com.kcc.fillin.survey.dto.SubmitRequest;
import org.apache.ibatis.annotations.Mapper;

import com.kcc.fillin.question.domain.QuestionItemVO;
import com.kcc.fillin.question.domain.QuestionVO;
import com.kcc.fillin.question.dto.DeleteQuestionItemRequest;
import com.kcc.fillin.question.dto.DeleteQuestionRequest;
import com.kcc.fillin.question.dto.UpdateQuestionItemRequest;
import com.kcc.fillin.question.dto.UpdateQuestionRequest;

import java.util.List;

@Mapper
public interface QuestionDao {

	boolean insertQuestion(QuestionVO questionVO);

	int insertQuestionItem(QuestionItemVO questionItemVO);

	boolean updateQuestion(UpdateQuestionRequest up);

	boolean deleteAllQuestionItem(Long item);

	boolean updateQuestionItem(UpdateQuestionItemRequest item);

	boolean deleteQuestion(DeleteQuestionRequest dr);

	boolean deleteQuestionItem(DeleteQuestionItemRequest dr);

    boolean insertAnswer(List<SubmitRequest> list);
}
