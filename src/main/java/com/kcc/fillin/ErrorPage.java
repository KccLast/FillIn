package com.kcc.fillin;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/fillin")
public class ErrorPage {

    @GetMapping("/errorPage")
    public String test() {
        return "/errorPage";
    }

}
