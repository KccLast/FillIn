package com.kcc.fillin.global.Common;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CommonVO {
	private Character isActive;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

}
