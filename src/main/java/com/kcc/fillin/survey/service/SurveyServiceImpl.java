package com.kcc.fillin.survey.service;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.kcc.fillin.survey.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kcc.fillin.survey.Criteria;
import com.kcc.fillin.survey.dao.SurveyDao;
import com.kcc.fillin.survey.dao.SurveyLogMapper;
import com.kcc.fillin.survey.domain.ParticipantVO;
import com.kcc.fillin.survey.domain.SurveyVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class SurveyServiceImpl implements SurveyService {
	private final SurveyDao mapper;

	//설문 로그
	private final SurveyLogMapper surveyLogMapper;

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
		int pageNum = cri.getPageNum();
		int amount = cri.getAmount();
		String username = cri.getUsername();

		// 1페이지라면 amount에서 1을 뺀 값으로 조정
		int newAmount = (pageNum == 1) ? amount - 1 : amount;

		int startRow = (pageNum - 1) * newAmount + 1;
		int endRow = pageNum * newAmount;

		return mapper.getSurveyListWithPaging(startRow, endRow, username);
	}

	@Override
	public int getTotalSurveyCount(String username) {
		return mapper.getTotalSurveyCount(username);
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

//	설문로그 가져오는 메서드
//	@Override
//	public List<SurveyLogDTO> getSurveyLogs(LocalDateTime startDate, LocalDateTime endDate) {
//		// Mapper에 startDate와 endDate를 전달하여 설문 로그 데이터 조회
//		return surveyLogMapper.findSurveyLogs(startDate, endDate);
//	}
//
////	설문 상태 비율 가져오는 메서드
//	@Override
//	public List<SurveyStatusDTO> getSurveyStatusCounts(LocalDateTime startDate, LocalDateTime endDate) {
//		// Mapper에 startDate와 endDate를 전달하여 설문 상태 비율 데이터 조회
//		return surveyLogMapper.findSurveyStatusCounts(startDate, endDate);
//	}
@Override
public List<SurveyLogDTO> getSurveyLogs(Long surveySeq, LocalDateTime startDate, LocalDateTime endDate) {
	List<SurveyLogDTO> surveyLogs ;
		try {
		surveyLogs = surveyLogMapper.findSurveyLogs(surveySeq, startDate, endDate);
	} catch (Exception e) {
			e.printStackTrace();

        return null;
	}
		return surveyLogs;
}



	@Override
	public List<SurveyStatusDTO> getAllSurveyStatusCounts(Long surveySeq, LocalDateTime startDate, LocalDateTime endDate) {
		return surveyLogMapper.findSurveyStatusCounts(surveySeq, startDate, endDate);
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
	public boolean createNewParticipant(ParticipantVO newParticipantVO) {
		return mapper.insertNewParticipant(newParticipantVO);

	}

	@Override
	public boolean createCheckLog(String surveyUrl) {

		return mapper.insertCheckLog(surveyUrl);
	}

	@Override
	public PostSurveyResponse addSurveyUrl(PostSurveyRequest request) {
		// url 생성 후 request에 업데이트
		String url = generateSurveyUrl(request.getSurveyId());

		// 기존 request 객체를 복사하면서 URL만 업데이트
		PostSurveyRequest updatedRequest = request.toBuilder()
			.url(url)
			.build();

		log.info(updatedRequest.toString());

		mapper.updateSurveyInfo(updatedRequest);

		return PostSurveyResponse.builder().surveyId(request.getSurveyId()).url(url).build();
	}


	private String generateSurveyUrl(long surveyId) {
		// surveyId를 문자열로 변환
		String surveyIdStr = String.valueOf(surveyId);

		// surveyId를 바이트 배열로 변환하여 UUID 생성
		UUID uuid = UUID.nameUUIDFromBytes(surveyIdStr.getBytes());

		// UUID 문자열 반환
		return uuid.toString();
	}
}
