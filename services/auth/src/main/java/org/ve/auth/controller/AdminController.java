package org.ve.auth.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.ve.auth.service.AdminRegistrationService;
import org.ve.auth.service.LoginService;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping(path = "api/auth")
@AllArgsConstructor
public class AdminController {
    private AdminRegistrationService adminRegistrationService;
    private LoginService loginService;
    @PostMapping(path="registration")
    public String register(@RequestBody AdminRegistrationRequest request){
        return adminRegistrationService.register(request);
    }

    @GetMapping(path ="confirm")
    public String confirm(@RequestParam("emailAddress") String emailAddress) throws ExecutionException, InterruptedException {
        return adminRegistrationService.confirm(emailAddress);
    }
    @GetMapping(path ="login")
    public String login(@RequestBody LoginRequest request) throws ExecutionException, InterruptedException {
        return loginService.login(request);
    }

    @GetMapping(path ="forgotPassword")
    public String forgotPassword(@RequestParam("emailAddress") String emailAddress) throws ExecutionException, InterruptedException {
        return loginService.forgotPassword(emailAddress);
    }


}