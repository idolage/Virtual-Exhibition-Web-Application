package org.ve.auth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.ve.auth.model.Auth;
import org.ve.auth.service.AuthService;

import java.util.concurrent.ExecutionException;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @PostMapping("/api/auth/addAttendee")
    @ResponseStatus(HttpStatus.OK)
    public String addAdmin(@RequestBody Auth auth) throws InterruptedException, ExecutionException {
        return authService.addAdmin(auth);
    }
}
