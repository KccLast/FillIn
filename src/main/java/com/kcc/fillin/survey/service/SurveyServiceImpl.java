package com.kcc.fillin.survey.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.kcc.fillin.survey.dto.SubmitRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kcc.fillin.survey.Criteria;
import com.kcc.fillin.survey.dao.SurveyDao;
import com.kcc.fillin.survey.domain.SurveyVO;
import com.kcc.fillin.survey.dto.CommonCodeResponse;
import com.kcc.fillin.survey.dto.MultiSearchSurveyRequest;
import com.kcc.fillin.survey.dto.MultiSearchSurveyResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SurveyServiceImpl implements SurveyService {
	private final SurveyDao mapper;

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

		for (CommonCodeResponse code : allCodes) {
			if (code.getParentSeq() == 2) {
				progressStatus.add(code);
			} else if (code.getParentSeq() == 8) {
				selectPeriod.add(code);
			}
		}

		Map<String, List<CommonCodeResponse>> resultMap = new HashMap<>();
		resultMap.put("progressStatus", progressStatus);
		resultMap.put("selectPeriod", selectPeriod);

		return resultMap;
	}

	@Override
	public boolean createNewSurvey(SurveyVO newSurvey) {

		return mapper.insertNewSurvey(newSurvey);
	}

	@Override
	public SurveyVO findSurveyBySurveySeq(Long surveySeq) {

		return mapper.selectSurveyBySurveySeq(surveySeq);
	}

	/*@Override
	public SurveyVO getSurveyByUrl(PageDTO pageDTO) {
	
		return mapper.selectSurveyByurl(pageDTO);
	}*/
	@Override
	public SurveyVO getSurveyByUrl(String url) {

		return mapper.selectSurveyByurl(url);
	}

	@Override
	@Transactional
	public Long createNewParticipant() {
		// TODO Auto-generated method stub
		//SurveyDao
		return null;
	}



}
