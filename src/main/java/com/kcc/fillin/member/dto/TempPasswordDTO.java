package com.kcc.fillin.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TempPasswordDTO {
    private String email;
    private String tempPassword;

    public TempPasswordDTO(String email, String tempPassword) {
        this.email = email;
        this.tempPassword = tempPassword;
    }

}
