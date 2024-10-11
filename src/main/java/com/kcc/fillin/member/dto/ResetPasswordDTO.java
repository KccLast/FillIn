package com.kcc.fillin.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordDTO {
    private String email;
    private String newPassword;

    public ResetPasswordDTO(String email, String newPassword) {
        this.email = email;
        this.newPassword = newPassword;
    }
}
