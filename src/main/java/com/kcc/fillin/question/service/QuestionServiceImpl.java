package com.kcc.fillin.question.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kcc.fillin.global.Exception.CannotCreateQuestionException;
import com.kcc.fillin.question.dao.QuestionDao;
import com.kcc.fillin.question.domain.QuestionItemVO;
import com.kcc.fillin.question.domain.QuestionVO;
import com.kcc.fillin.question.dto.UpdateQuestionRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {
	private final QuestionDao questionDao;

	@Transactional
	@Override
	public boolean insertQuestionAndQuestionItem(List<QuestionVO> questionVOList) throws CannotCreateQuestionException {
		//먼저 question을 넣고, questionItem이나 Condition을 차례로 넣으면됨
		//이때 question을 넣고 questionVO에 question에 seq가 있어야하고, questionItem도 item에 seq가 생겨야함
		boolean questionInsertResult = false;
		int questionItemInsertResult = 0;
		for (QuestionVO questionVO : questionVOList) {
			questionItemInsertResult = 0;
			questionInsertResult = questionDao.insertQuestion(questionVO);

			System.out.println(questionInsertResult);

			if (questionVO.isQuestionItemExist()) {
				questionItemInsertResult = insertQuestionItem(questionVO.getSeq(), questionVO.getQuestionItems());

				//조건 항목 수 검사
				if (!questionVO.compareQuestionItemCnt(questionItemInsertResult) || questionInsertResult == false) {
					throw new CannotCreateQuestionException();
				}
			}

			//추후 조건 수 포함해서 생성할 그엇!

		}
		return true;
	}

	private int insertQuestionItem(Long questionSeq, List<QuestionItemVO> questionItems) {
		int result = 0;
		for (QuestionItemVO questionItemVO : questionItems) {
			questionItemVO.setQuestionSeq(questionSeq);
			result += questionDao.insertQuestionItem(questionItemVO);
		}
		return result;
	}

	@Override
	@Transactional
	public boolean updateQuestion(List<UpdateQuestionRequest> updateRequests) {

		for (UpdateQuestionRequest up : updateRequests) {

			boolean result = questionDao.updateQuestion(up);

			if (result == false) {
				return false;
			}
		}

		return true;
	}

}
