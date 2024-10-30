package com.kcc.fillin.statistic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/statistics")
public class StatisticsController_JA {
    @GetMapping("/custom-statistics")
    public String customStatistics() {
        return "/statistic/linearRegression";
    }
}
