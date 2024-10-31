package com.kcc.fillin.statistic.controller;

import com.kcc.fillin.statistic.dto.QuantityQuestionsResponse;
import com.kcc.fillin.statistic.service.StatisticsService_JA;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/statistics")
public class StatisticsController_JA {
    private final StatisticsService_JA service;

    @GetMapping("/liner-regression/{seq}")
    public String linerRegression(@PathVariable Long seq, Model model) {
        System.out.println("seq: " + seq);
        List<QuantityQuestionsResponse> survey = service.getQuantityQuestionsBySurvey(seq);
        System.out.println("survey: " + survey);

        model.addAttribute("surveySeq", seq);
        model.addAttribute("survey", survey);
        return "/statistic/linearRegression";
    }
}
