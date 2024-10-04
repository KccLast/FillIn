package com.kcc.fillin.statistic.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/statistic")
public class StatisticController2 {
    @GetMapping("/keyword")
    public String statistic() {
        return "/statistic/keyword";
    }
}
