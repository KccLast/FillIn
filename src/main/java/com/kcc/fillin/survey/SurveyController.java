package com.kcc.fillin.survey;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/survey")
public class SurveyController {
	@GetMapping("/dashboard")
	public String dashboard() {
		return "index";
	}
}
