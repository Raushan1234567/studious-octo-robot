
package com.devops.baseline.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class VersionController {

    @GetMapping("/version")
    public Map<String, String> version() {
        return Map.of(
            "application", "My Spring Boot Backend",
            "version", "1.0.0",
            "status", "running"
        );
    }
}
