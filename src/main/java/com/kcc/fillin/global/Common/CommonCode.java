package com.kcc.fillin.global.Common;

import lombok.ToString;

@ToString
public enum CommonCode {
	CHOICE(7L, "객관식", "CHOICE"),
	DROPDOWN(10L, "드롭다운", "DROPDOWN"),
	LINEAR_SCALE(9L, "선형배율", "LINEAR_SCALE"),
	MATRIX(11L, "객관식표", "MATRIX"),
	CHECKBOX(8L, "체크박스", "CHECKBOX"),
	SHORT_ANSWER(12L, "단답형", "SHORT_ANSWER"),
	LONG_ANSWER(13L, "장문형", "LONG_ANSWER"),
	GENDER(19L, "성별", "GENDER"),
	LOCATION(17L, "위치기록", "LOCATION"),
	DATE(20L, "날짜", "DATE"),
	PHONE(16L, "전화번호", "PHONE"),
	ADDRESS(15L, "주소", "ADDRESS"),
	EMAIL(14L, "이메일", "EMAIL"),
	PERSONALDATA(18L, "개인정보", "PERSONALDATA"),
	PICTURE(21L, "사진", "PICTURE");

	private Long commonCode;
	private String codeName;
	private String codeEngName;

	private CommonCode(Long code, String name, String codeEngName) {
		this.commonCode = code;
		this.codeName = name;
		this.codeEngName = codeEngName;
	}

	public Long getCommonCode() {
		return this.commonCode;
	}

	public String getCodeName() {
		return this.codeName;
	}

	public boolean compare(Long seq) {

		return this.commonCode == seq;
	}

	public static String getCodeEngNameByccSeq(Long ccSeq) {

		for (CommonCode code : CommonCode.values()) {

			if (code.compare(ccSeq)) {
				return code.codeEngName;
			}
		}
		return null;
	}
}
