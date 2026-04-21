package com.eagleleap.api.controller;

import com.eagleleap.api.dto.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    @GetMapping("/summary")
    public ApiResponse<Map<String, Object>> summary() {
        return ApiResponse.success("Dashboard summary scaffold ready.", Map.of(
            "totalBooksPublished", 0,
            "totalPaperSubmissions", 0,
            "totalStoreOrders", 0,
            "pendingEnquiries", 0
        ));
    }
}
