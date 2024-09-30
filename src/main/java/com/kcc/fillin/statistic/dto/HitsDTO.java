package com.kcc.fillin.statistic.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
