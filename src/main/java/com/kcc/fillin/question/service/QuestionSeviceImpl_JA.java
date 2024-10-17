package com.kcc.fillin.question.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kcc.fillin.question.dao.QuestionDao_JA;
import com.kcc.fillin.question.dto.QuestionCommonCodeResonse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionSeviceImpl_JA implements QuestionService_JA {
	private final QuestionDao_JA dao;
	
	@Override
	public List<QuestionCommonCodeResonse> getCommonCode() {
		return dao.getCommonCode();
	}
	
}
