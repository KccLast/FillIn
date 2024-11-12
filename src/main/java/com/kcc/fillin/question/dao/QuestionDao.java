package com.kcc.fillin.question.dao;

import com.kcc.fillin.question.dto.*;
import com.kcc.fillin.survey.dto.MemberSurveyResponse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kcc.fillin.question.domain.QuestionItemVO;
import com.kcc.fillin.question.domain.QuestionVO;
import com.kcc.fillin.survey.dto.SubmitRequest;

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

	boolean insertAnswer(@Param("submit")
	SubmitRequest list, @Param("insertVal")
	String val);

	void updateParticipantData(@Param("colName")
	String personalDataTypeName, @Param("content")
	String content, @Param("participantSeq")
	Long participant);

    int countCondition(ConditionRequest conditionRequest);

	boolean insertCondition(ConditionRequest conditionRequest);

	boolean updateCondition(ConditionRequest conditionRequest);

	Integer getOrderNum(Long surveySeq);

    boolean deleteCondition(ConditionRequest conditionRequest);

    List<MemberSurveyResponse> selectSurveyByMemberSeq(Long seq);

	void updateQuestionAuto(QuestionAutoUpdateRequest questionAutoUpdateRequest);

    void updateQuestionItemAuto(QuestionAutoUpdateRequest questionAutoUpdateRequest);



	void InsertQuestionItemAuto(QuestionItemInsertRequest questionAutoUpdateRequest);
}
