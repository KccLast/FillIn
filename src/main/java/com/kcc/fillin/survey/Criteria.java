package com.kcc.fillin.survey;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Criteria {
	private int pageNum;
	private int amount;

	public Criteria() {
		this(1, 9);
	}

	public Criteria(int pageNum, int amount) {
		this.pageNum = pageNum;
		this.amount = amount;
	}

	public int getStartRow() {
		return (pageNum - 1) * amount + 1; // 시작 인덱스
	}

	public int getEndRow() {
		return pageNum * amount; // 끝 인덱스
	}

}
