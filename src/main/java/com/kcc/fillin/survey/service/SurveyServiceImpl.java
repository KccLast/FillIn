package com.kcc.fillin.survey.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kcc.fillin.survey.Criteria;
import com.kcc.fillin.survey.dao.SurveyDao;
import com.kcc.fillin.survey.dao.SurveyLogMapper;
import com.kcc.fillin.survey.domain.ParticipantVO;
import com.kcc.fillin.survey.domain.SurveyVO;
import com.kcc.fillin.survey.dto.CommonCodeResponse;
import com.kcc.fillin.survey.dto.MultiSearchSurveyRequest;
import com.kcc.fillin.survey.dto.MultiSearchSurveyResponse;
import com.kcc.fillin.survey.dto.PostSurveyRequest;
import com.kcc.fillin.survey.dto.PostSurveyResponse;
import com.kcc.fillin.survey.dto.SurveyLogDTO;

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

	// SurveyService 인터페이스의 메서드를 구현 (페이징 포함)(, int page, int size)
	@Override
	public List<SurveyLogDTO> getSurveyLogs(LocalDate startDate, LocalDate endDate) {
		//		int offset = (page - 1) * size;

		// Mapper를 호출하여 데이터베이스에서 설문 로그를 조회 (offset과 size 포함), offset, size
		return surveyLogMapper.findSurveyLogs(startDate, endDate);
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
