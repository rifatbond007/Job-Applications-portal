package com.Jobtrackr.jta.user.dto;

public class LoginResponse {
    private String token;
    private AuthUser user;

    public LoginResponse(String token, AuthUser user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() { return token; }
    public AuthUser getUser() { return user; }
}

