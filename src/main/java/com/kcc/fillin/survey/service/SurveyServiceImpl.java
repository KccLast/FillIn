package com.kcc.fillin.survey.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kcc.fillin.survey.Criteria;
import com.kcc.fillin.survey.dto.multiSearchSurveyRequest;
import com.kcc.fillin.survey.dto.multiSearchSurveyResponse;
import com.kcc.fillin.survey.mapper.SurveyMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SurveyServiceImpl implements SurveyService {
	private final SurveyMapper mapper;

	@Override
	public List<multiSearchSurveyResponse> getAllSurveys() {
		return mapper.getAllSurveys();
	}

	@Override
	public List<multiSearchSurveyResponse> getFilteringSurveys(multiSearchSurveyRequest request) {
		return mapper.getFilteringSurveys(request);
	}

	@Override
	public List<multiSearchSurveyResponse> getSurveyListWithPaging(Criteria cri) {
		int startRow = cri.getStartRow();
		int endRow = cri.getEndRow();

		return mapper.getSurveyListWithPaging(startRow, endRow);
	}

	@Override
	public int getTotalSurveyCount() {
		return mapper.getTotalSurveyCount();
	}
}
