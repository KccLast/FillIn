package com.kcc.fillin.question.service;

import java.util.List;

import com.kcc.fillin.question.domain.QuestionItemVO;
import com.kcc.fillin.question.domain.QuestionVO;
import com.kcc.fillin.question.dto.UpdateQuestionRequest;

public interface QuestionService {
	public boolean insertQuestionAndQuestionItem(List<QuestionVO> questionVOList);

	public boolean updateQuestion(List<UpdateQuestionRequest> updateRequests);

	public boolean insertQuestionItems(List<QuestionItemVO> insertItems);
}
