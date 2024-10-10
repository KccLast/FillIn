package com.kcc.fillin.question.service;

import com.kcc.fillin.global.Exception.CannotCreateQuestionException;
import com.kcc.fillin.question.dao.QuestionDao;
import com.kcc.fillin.question.domain.QuestionItemVO;
import com.kcc.fillin.question.domain.QuestionVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService{
    private final QuestionDao questionDao;

    @Transactional
    @Override
    public boolean insertQuestionAndQuestionItem(List<QuestionVO> questionVOList) throws CannotCreateQuestionException{
        //먼저 question을 넣고, questionItem이나 Condition을 차례로 넣으면됨
        //이때 question을 넣고 questionVO에 question에 seq가 있어야하고, questionItem도 item에 seq가 생겨야함
        boolean questionInsertResult = false;
        int questionItemInsertResult = 0;
        for(QuestionVO questionVO : questionVOList){
            questionItemInsertResult = 0;
            questionInsertResult = questionDao.insertQuestion(questionVO);

            System.out.println(questionInsertResult);

           if(questionVO.isQuestionItemExist()){
               questionItemInsertResult = insertQuestionItem(questionVO.getSeq(),questionVO.getQuestionItems());
           }

            System.out.println("다넣은 값 = " + questionItemInsertResult);
            System.out.println("이건 원래 list " + questionVO.getQuestionItems().size());

           //추후 조건 수 포함해서 생성할 그엇!
           if(!questionVO.compareQuestionItemCnt(questionItemInsertResult) || questionInsertResult == false){
               throw new CannotCreateQuestionException();
           }

        }
        return true;
    }


    private int insertQuestionItem(Long questionSeq,List<QuestionItemVO> questionItems) {
        int result=0;
        for(QuestionItemVO questionItemVO : questionItems){
            questionItemVO.setQuestionSeq(questionSeq);
            result += questionDao.insertQuestionItem(questionItemVO);
        }
        return result;
    }
}
