package com.kcc.fillin.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import lombok.Value;

@Configuration
public class OpenAiConfig {
//	@Value(${openai.api.key})
	private String openAiKey;
	@Bean
	public RestTemplate template() {
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.getInterceptors().add((request, body, execution) ->{
			request.getHeaders().add("Authorization", "Bearer " + openAiKey);
			return execution.execute(request, body);
		});
		
		return restTemplate;
	}
	
}
