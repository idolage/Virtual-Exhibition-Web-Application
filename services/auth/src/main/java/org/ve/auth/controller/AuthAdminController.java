package org.ve.auth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.ve.auth.model.AuthAdmin;
import org.ve.auth.service.AuthAdminService;
import java.util.concurrent.ExecutionException;

@RestController
@RequiredArgsConstructor
public class AuthAdminController {
    private final AuthAdminService authAdminService;;
    @PostMapping("api/auth/addAdmin")
    @ResponseStatus(HttpStatus.OK)
    public String addAdmin(@RequestBody AuthAdmin authAdmin) throws InterruptedException, ExecutionException {
        return null;
//        authAdminService.addAdmin(authAdmin);
    }

}