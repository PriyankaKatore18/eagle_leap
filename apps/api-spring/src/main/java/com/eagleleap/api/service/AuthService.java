package com.eagleleap.api.service;

import com.eagleleap.api.dto.LoginRequest;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    public Map<String, String> login(LoginRequest request) {
        return Map.of(
            "token", "spring-reference-token",
            "email", request.email()
        );
    }
}
