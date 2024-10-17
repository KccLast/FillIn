package com.kcc.fillin.statistic.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class HitsDTO {
	private LocalDate occurDate;
	private Long totalViews;
	private Long startCount;
	private Long completedCount;
}
