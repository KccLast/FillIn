package com.kcc.fillin.global.Common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Response<T> {
	private static final String SUCCESS = "success";
	private static final String ERROR = "error";
	private static final String FAIL = "fail";
	private String status;
	private int statusCode;
	private T data;

	private String message;
	private String requestUrl;

	public static <T> Response<T> setSuccess(T data, int code) {
		return new ResponseBuilder<T>().message("").data(data).status(SUCCESS).statusCode(code)
			.build();
	}

	public static Response<?> setMessage(Response<?> target, String message) {
		target.message = message;
		return target;
	}

	public static <T> Response<T> setSuccess(T data, int code, String message) {
		return new ResponseBuilder<T>().message(message).data(data).status(SUCCESS).statusCode(code)
			.build();
	}

	public static Response<?> setError(String errorMessage, int code) {
		return new ResponseBuilder<>().status(ERROR).message(errorMessage).statusCode(code).build();
	}

	public static Response<?> setFailWithBindingResult(BindingResult bindingResult, int code) {
		Map<String, String> fails = new HashMap<>();

		List<ObjectError> allErrors = bindingResult.getAllErrors();
		for (ObjectError er : allErrors) {
			if (er instanceof FieldError) {
				fails.put(((FieldError)er).getField(), er.getDefaultMessage());
			} else {
				fails.put(er.getObjectName(), er.getDefaultMessage());
			}
		}
		return new ResponseBuilder<>().data(fails).status(FAIL).statusCode(code).message("").build();
	}

	public static <T> Response<T> setFail(T data, int code, String message) {
		return new ResponseBuilder<T>().message(message).data(data).status(FAIL).statusCode(code)
			.build();
	}

	public static <T> Response<T> setFail(T data, int code) {
		return new ResponseBuilder<T>().message("").data(data).status(FAIL).statusCode(code)
			.build();
	}

	public static Response<?> setError(String errorMessage, int code, String uri) {
		// TODO Auto-generated method stub
		return new ResponseBuilder<>().status(ERROR).message(errorMessage).statusCode(code).requestUrl(uri)
			.build();
	}

}
