package com.kcc.fillin.global.Common;

import java.time.LocalDateTime;

public class TestVO {
	private long id;
	private String name = "";
	private LocalDateTime postDate;
	private LocalDateTime endDate;
	private String url;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private int targetPeople;
	private int ccId;
	private long memberId;

	public String getFormatPostDate() {
		return CommonDateFormat.getDateFormat(postDate);
	}

	//${testVO.formatPostDate} EL태그에서 사용
}
