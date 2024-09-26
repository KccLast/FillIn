package com.kcc.fillin.survey.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/survey")
public class SurveyController {
	@GetMapping("/dashboard")
	public String dashboard() {
		return "/survey/dashboard";
	}
}
