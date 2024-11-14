package com.kcc.fillin;

import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoHandlerFoundException.class)
    public String handle404(Model model) {
        model.addAttribute("errorMessage", "요청하신 페이지를 찾을 수 없습니다.");
        return "errorPage";  // errorPage.jsp로 이동
    }

    @ExceptionHandler(Exception.class)
    public String handleGeneralException(Model model, Exception ex) {
        model.addAttribute("errorMessage", ex.getMessage());
        return "generalError";  // 기타 에러 페이지로 이동
    }
}
