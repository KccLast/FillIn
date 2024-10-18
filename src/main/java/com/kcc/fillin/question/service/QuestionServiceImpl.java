package com.kcc.fillin.question.service;

import java.util.List;

import com.kcc.fillin.question.dto.*;
import com.kcc.fillin.survey.dao.SurveyDao;
import com.kcc.fillin.survey.domain.SurveyVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kcc.fillin.global.Common.CommonCodeType;
import com.kcc.fillin.global.Exception.CannotCreateQuestionException;
import com.kcc.fillin.question.dao.QuestionDao;
import com.kcc.fillin.question.domain.QuestionItemVO;
import com.kcc.fillin.question.domain.QuestionVO;
import com.kcc.fillin.survey.dto.SubmitRequest;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {
	private final QuestionDao questionDao;
	private final SurveyDao surveyDao;

	@Override
	public boolean insertQuestionAndQuestionItem(List<QuestionVO> questionVOList) throws CannotCreateQuestionException {
		//먼저 question을 넣고, questionItem이나 Condition을 차례로 넣으면됨
		//이때 question을 넣고 questionVO에 question에 seq가 있어야하고, questionItem도 item에 seq가 생겨야함
		boolean questionInsertResult = false;
		int questionItemInsertResult = 0;
		for (QuestionVO questionVO : questionVOList) {
			questionItemInsertResult = 0;
			questionInsertResult = questionDao.insertQuestion(questionVO);

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
	public boolean updateQuestion(List<UpdateQuestionRequest> updateRequests) {

		for (UpdateQuestionRequest up : updateRequests) {

			boolean result = questionDao.updateQuestion(up);

			if (result == false) {
				return false;
			}
		}

		return true;
	}

	@Override
	public boolean insertQuestionItems(List<QuestionItemVO> insertItems) {
		int result = insertQuestionItem(insertItems.get(0).getQuestionSeq(), insertItems);

		if (result < 1) {
			return false;
		}
		return true;
	}

	@Override
	public boolean updateQuestionItems(List<UpdateQuestionItemRequest> list) {
		boolean updateResult = false;
		for (UpdateQuestionItemRequest item : list) {

			if (item.getDropdownOptionList().size() > 0) {
				updateResult = updateDropItem(item);
			} else {
				updateResult = updateQuestionItem(item);
			}

			if (updateResult == false) {
				throw new RuntimeException("질문 항목 수정에 실패");
			}
		}

		return true;
	}

	@Override
	public boolean deleteQuestion(List<DeleteQuestionRequest> deleteList) {
		// TODO Auto-generated method stub
		boolean deleteResult = false;
		boolean ItemResult = false;
		for (DeleteQuestionRequest dr : deleteList) {
			ItemResult = questionDao.deleteAllQuestionItem(dr.getSeq());
			deleteResult = questionDao.deleteQuestion(dr);

		}
		return true;
	}

	@Override
	public boolean deleteQuestionItem(List<DeleteQuestionItemRequest> deleteList) {
		boolean deleteResult = false;
		for (DeleteQuestionItemRequest dr : deleteList) {
			deleteResult = questionDao.deleteQuestionItem(dr);
			if (!deleteResult) {
				return false;
			}
		}

		return true;
	}

	@Override
	@Transactional
	public boolean insertAnswer(List<SubmitRequest> list) {
		//ccseq가 14,15,16이면 응답이 아니라 설문참여자의 데이터 업데이트 해야함

		list.stream().forEach(item -> {
			Long participant = item.getParticipantSeq();
			if (CommonCodeType.isParticipantPersonalAnswer(item.getCcSeq())) {

				questionDao.updateParticipantData(CommonCodeType.personalDataTypeName(item.getCcSeq()),
					item.getContents().get(0), participant);
			} else {
				for (String val : item.getContents()) {
					questionDao.insertAnswer(item, val);
				}
			}

		});

		return true;
	}

	@Override
	@Transactional
	public boolean createAutoQuestion(CreateAutoQuestionRequest selectedQuestions) {
		SurveyVO convertedVO = convertAutoQuestionToSurveyVO(selectedQuestions);
		//surveyDao.insertNewSurvey()
		surveyDao.insertNewSurvey(convertedVO);
		selectedQuestions.setSeq(convertedVO.getSeq());


		return false;
	}

	private boolean answerIsContactData(SubmitRequest item) {
		// TODO Auto-generated method stub
		return false;
	}

	private boolean updateQuestionItem(UpdateQuestionItemRequest item) {
		return questionDao.updateQuestionItem(item);
	}

	private boolean updateDropItem(UpdateQuestionItemRequest item) {
		deleteAllQuestionItemInQuestion(item.getSeq());

		for (UpdateDropContent dr : item.getDropdownOptionList()) {
			questionDao.insertQuestionItem(dr.transferQuestItemVO());
		}
		return true;
	}

	private boolean deleteAllQuestionItemInQuestion(Long item) {
		return questionDao.deleteAllQuestionItem(item);
	}
	private SurveyVO convertAutoQuestionToSurveyVO(CreateAutoQuestionRequest target){
		return SurveyVO.getSurveyVOFromNameAndMemberSeq(target.getSurveyName(),target.getMemberSeq());
	}

	private List<QuestionVO> convertAutoQuestionToQuestionVOList(CreateAutoQuestionRequest target){
			final Long surveySeq = target.getSeq();

		return null;
	}

}
