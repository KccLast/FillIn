package com.kcc.fillin.util.jina;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum QuestionType {
	CCSEQ_7(7, "객관식"),
	CCSEQ_8(8, "체크박스"),
	CCSEQ_12(12, "단답형"),
	CCSEQ_13(13, "장문형");
	
	private final int ccSeq;
	private final String displayName;
	
	public static QuestionType fromSeq(int ccSeq) {
        for (QuestionType type : QuestionType.values()) {
            if (type.getCcSeq() == ccSeq) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown ccSeq: " + ccSeq);
    }
	
	public static QuestionType fromDisplayName(String displayName) {
        for (QuestionType type : QuestionType.values()) {
            if (type.getDisplayName().equals(displayName)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown display name: " + displayName);
    }
}
