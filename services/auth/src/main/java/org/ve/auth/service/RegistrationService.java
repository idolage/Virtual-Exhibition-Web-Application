package org.ve.auth.service;

import org.springframework.stereotype.Service;
import org.ve.auth.controller.RegistrationRequest;
@Service
public class RegistrationService {
    public String register(RegistrationRequest request) {
        return "works";
    }
}
