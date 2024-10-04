package com.kcc.fillin.global.Common;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CommonDateFormat {

	private static final DateTimeFormatter timeDateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd a h:mm:ss");

	public static String getDateFormat(LocalDateTime localDateTime) {
		return localDateTime.format(timeDateFormat);
	}

}
