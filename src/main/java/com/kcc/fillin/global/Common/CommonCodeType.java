package com.kcc.fillin.global.Common;

import java.util.EnumSet;

public enum CommonCodeType {
	QUAN(3, "정량", EnumSet.of(
		CommonCode.CHOICE,
		CommonCode.CHECKBOX,
		CommonCode.DROPDOWN,
		CommonCode.LINEAR_SCALE,
		CommonCode.MATRIX)),

	QUAL(4, "정성", EnumSet.of(
		CommonCode.LONG_ANSWER,
		CommonCode.SHORT_ANSWER)),

	DATA(6, "데이터", EnumSet.of(
		CommonCode.LOCATION,
		CommonCode.PICTURE,
		CommonCode.GENDER,
		CommonCode.DATE,
		CommonCode.PERSONALDATA

	)),

	CONTACT(5, "연락처", EnumSet.of(
		CommonCode.ADDRESS,
		CommonCode.EMAIL,
		CommonCode.PHONE

	));

	private int num;
	private String name;
	private EnumSet<CommonCode> subTypes;

	private CommonCodeType(int num, String name, EnumSet<CommonCode> subs) {
		this.num = num;
		this.name = name;
		this.subTypes = subs;
	}

	public boolean isGroupData(Long seq) {
		for (CommonCode code : this.subTypes) {
			if (code.compare(seq)) {
				return true;
			}
		}
		return false;
	}

	public String getCodeNameBySeq(Long ccSeq) {
		for (CommonCode code : this.subTypes) {
			if (code.compare(ccSeq)) {
				return code.getCodeName();
			}
		}
		return null;
	}

	public static boolean isParticipantPersonalAnswer(Long ccSeq) {
		for (CommonCode code : CONTACT.subTypes) {
			if (code.compare(ccSeq) || CommonCode.GENDER.compare(ccSeq)) {
				return true;
			}
		}

		return false;
	}

	public static String personalDataTypeName(Long ccSeq) {

		return CommonCode.getCodeEngNameByccSeq(ccSeq);
	}
}
