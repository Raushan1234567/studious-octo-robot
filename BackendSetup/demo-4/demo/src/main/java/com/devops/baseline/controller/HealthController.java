

package com.devops.baseline.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public String health() {
        return "Backend is running successfully!";
    }
}


 
// PS C:\Users\lenovo\Desktop\CI\studious-octo-robot> cd BackendSetup
// PS C:\Users\lenovo\Desktop\CI\studious-octo-robot\BackendSetup> cd demo-4
// PS C:\Users\lenovo\Desktop\CI\studious-octo-robot\BackendSetup\demo-4> cd demo
// PS C:\Users\lenovo\Desktop\CI\studious-octo-robot\BackendSetup\demo-4\demo> .\mvnw.cmd spring-boot:run