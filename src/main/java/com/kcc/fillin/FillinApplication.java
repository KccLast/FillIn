package com.kcc.fillin;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.kcc.fillin.member.mapper")  // MyBatis Mapper 스캔 경로 지정
public class FillinApplication {

	public static void main(String[] args) {
		SpringApplication.run(FillinApplication.class, args);
	}

}
