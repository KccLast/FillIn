package com.kcc.fillin.question.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kcc.fillin.question.controller.QuestionRestController;
import com.kcc.fillin.question.domain.QuestionItemVO;
import com.kcc.fillin.question.domain.QuestionVO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.junit.jupiter.api.Assertions.*;
@Transactional
@SpringBootTest
@AutoConfigureMockMvc
class QuestionServiceImplTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private QuestionService questionService;  // 모킹할 서비스

    @Autowired
    private ObjectMapper objectMapper;  // JSON 직렬화/역직렬화를 위한 ObjectMapper

    private List<QuestionVO> questionVOList;

    @BeforeEach
    public void setup() {
        // 테스트 데이터를 미리 설정 (QuestionVO를 채워 넣음)
        questionVOList = new ArrayList<>();
        QuestionVO question = new QuestionVO();
        question.setSeq(1999999L);
        question.setSurveySeq(199999L);
        question.setName("Sample Question");
        question.setDescription("Sample Description");
        question.setOrder(1);
        question.setIsEssential('Y');

        // QuestionItems 추가
        List<QuestionItemVO> questionItems = new ArrayList<>();
        QuestionItemVO questionItem = new QuestionItemVO();
        questionItem.setSeq(199999L);
        questionItem.setQuestionSeq(1999999L);
        questionItem.setContent("Sample Item");
        questionItem.setOrderNum(1);
        questionItems.add(questionItem);

        question.setQuestionItems(questionItems);

        questionVOList.add(question);
    }

    @Test
    @Transactional
    public void testInsertQuestion() throws Exception {
        // questionService.insertQuestionAndQuestionItem을 모킹하여 true를 리턴하도록 설정
        Mockito.when(questionService.insertQuestionAndQuestionItem(Mockito.anyList()))
                .thenReturn(true);

        // API 호출 및 결과 검증
        mockMvc.perform(post("/api/question")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(questionVOList)))
                .andExpect(status().isOk());  // 응답이 200 OK인지 확인
    }
}