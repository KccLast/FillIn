package com.kcc.fillin.question.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kcc.fillin.question.dto.QuestionCommonCodeResonse;

@Mapper
public interface QuestionDao_JA {
	public List<QuestionCommonCodeResonse> getCommonCode();
}
