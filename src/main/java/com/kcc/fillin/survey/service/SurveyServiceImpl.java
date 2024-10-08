package com.kcc.fillin.survey.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kcc.fillin.survey.Criteria;
import com.kcc.fillin.survey.dao.SurveyMapper;
import com.kcc.fillin.survey.dto.CommonCodeResponse;
import com.kcc.fillin.survey.dto.MultiSearchSurveyRequest;
import com.kcc.fillin.survey.dto.MultiSearchSurveyResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SurveyServiceImpl implements SurveyService {
	private final SurveyMapper mapper;

	@Override
	public List<MultiSearchSurveyResponse> getAllSurveys() {
		return mapper.getAllSurveys();
	}

	@Override
	public List<MultiSearchSurveyResponse> getFilteringSurveys(MultiSearchSurveyRequest request) {
		return mapper.getFilteringSurveys(request);
	}

	@Override
	public List<MultiSearchSurveyResponse> getSurveyListWithPaging(Criteria cri) {
		int startRow = cri.getStartRow();
		int endRow = cri.getEndRow();

		return mapper.getSurveyListWithPaging(startRow, endRow);
	}

	@Override
	public int getTotalSurveyCount() {
		return mapper.getTotalSurveyCount();
	}

	@Override
	public Map<String, List<CommonCodeResponse>> getCommonCodes() {
		List<CommonCodeResponse> allCodes = mapper.getCommonCodes();
		List<CommonCodeResponse> progressStatus = new ArrayList<>();
		List<CommonCodeResponse> selectPeriod = new ArrayList<>();
		
		for(CommonCodeResponse code : allCodes) {
			if(code.getParentSeq() == 2) {
				progressStatus.add(code);
			} else if(code.getParentSeq() == 8) {
				selectPeriod.add(code);
			}
		}
		
		Map<String, List<CommonCodeResponse>> resultMap = new HashMap<>();
		resultMap.put("progressStatus", progressStatus);
		resultMap.put("selectPeriod", selectPeriod);
		
		return resultMap;
	}

	
}
