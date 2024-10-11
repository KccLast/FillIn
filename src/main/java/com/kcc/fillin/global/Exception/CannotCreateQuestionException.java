package com.kcc.fillin.global.Exception;

public class CannotCreateQuestionException extends RuntimeException{

    public CannotCreateQuestionException(){
        super("질문 생성에 실패했습니다.");
    }

    public CannotCreateQuestionException(String msg){
        super(msg);
    }

}
