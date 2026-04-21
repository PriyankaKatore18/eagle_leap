package com.eagleleap.api.controller;

import com.eagleleap.api.dto.ApiResponse;
import com.eagleleap.api.dto.LoginRequest;
import com.eagleleap.api.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ApiResponse<Map<String, String>> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.success("Login endpoint scaffold ready.", authService.login(request));
    }

    @GetMapping("/health")
    public ApiResponse<String> health() {
        return ApiResponse.success("Spring auth module ready.", "ok");
    }
}
