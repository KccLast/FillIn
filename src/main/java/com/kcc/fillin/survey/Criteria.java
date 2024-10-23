package com.kcc.fillin.survey;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Criteria {
	private int pageNum;
	private int amount;

	public Criteria() {
		this(1, 6);
	}

	public Criteria(int pageNum, int amount) {
		this.pageNum = pageNum;
		this.amount = amount;
	}

	
	/* public int getAmount() { return (pageNum == 1) ? amount - 1 : amount; } */


	public int getStartRow() {
		return (pageNum - 1) * amount + 1; // 시작 인덱스
	}

	public int getEndRow() {
		return pageNum * amount; // 끝 인덱스
	}

}
