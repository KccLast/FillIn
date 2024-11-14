package com.kcc.fillin;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

public class ErrorControllerCustom implements ErrorController {
    @RequestMapping("/error")
    public String handleError(Model model) {
        System.out.println(" dasdasdsadasdasd");
        model.addAttribute("errorMessage", "페이지를 찾을 수 없습니다.");
        return "/errorPage";  // 변경할 에러 페이지 경로
    }

}
