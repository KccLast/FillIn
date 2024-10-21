package com.kcc.fillin.question.service;

import java.util.List;

import com.kcc.fillin.question.domain.QuestionItemVO;
import com.kcc.fillin.question.domain.QuestionVO;
import com.kcc.fillin.question.dto.*;
import com.kcc.fillin.survey.dto.SubmitRequest;

public interface QuestionService {
	public boolean insertQuestionAndQuestionItem(List<QuestionVO> questionVOList);

	public boolean updateQuestion(List<UpdateQuestionRequest> updateRequests);

	public boolean insertQuestionItems(List<QuestionItemVO> insertItems);

	boolean updateQuestionItems(List<UpdateQuestionItemRequest> list);

	public boolean deleteQuestion(List<DeleteQuestionRequest> deleteList);

	public boolean deleteQuestionItem(List<DeleteQuestionItemRequest> deleteList);

	public boolean insertAnswer(List<SubmitRequest> list);

    public Long createAutoQuestion(CreateAutoQuestionRequest selectedQuestions);
}
