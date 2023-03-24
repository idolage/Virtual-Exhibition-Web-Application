package org.ve.auth.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.ve.auth.model.Admin;
import org.ve.auth.model.Attendee;

import org.ve.auth.model.ExhibitionOwner;
import org.ve.auth.model.Exhibitor;
import org.ve.auth.service.*;

import javax.servlet.http.HttpServletResponse;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin("*")
@RequestMapping(path = "api/auth")
@AllArgsConstructor
public class Controller {
    private AdminRegistrationService adminRegistrationService;
    private AttendeeRegistrationService attendeeRegistrationService;
    private ExhibitorRegistrationService exhibitorRegistrationService;
    private ExhibitionOwnerRegistrationService exhibitionOwnerRegistrationService;
    private LoginService loginService;
    private AuthService authService;

    @GetMapping(path ="validate/{token}")
    @ResponseStatus(HttpStatus.OK)
    public String login(@PathVariable("token") String token) {
        return loginService.validate(token);
    }
    @PostMapping(path="adminRegistration")
    @ResponseStatus(HttpStatus.OK)
    public String register(@RequestBody AdminRegistrationRequest request){
        return adminRegistrationService.register(request);
    }
    @PostMapping(path="attendeeRegistration")
    @ResponseStatus(HttpStatus.OK)
    public String register(@RequestBody AttendeeRegistrationRequest request){
        return attendeeRegistrationService.register(request);
    }
    @PostMapping(path="exhibitionOwnerRegistration")
    @ResponseStatus(HttpStatus.OK)
    public String register(@RequestBody ExhibitionOwnerRegistrationRequest request){
        return exhibitionOwnerRegistrationService.register(request);
    }
    @PostMapping(path="exhibitorRegistration")
    @ResponseStatus(HttpStatus.OK)
    public String register(@RequestBody ExhibitorRegistrationRequest request){
        return exhibitorRegistrationService.register(request);
    }
    @GetMapping(path ="getAdmin/{emailAddress}")
    @ResponseStatus(HttpStatus.OK)
    public Admin getAdmin(@PathVariable("emailAddress") String emailAddress) throws ExecutionException, InterruptedException {
        return authService.getAdmin(emailAddress);
    }
    @GetMapping(path ="getAttendee/{emailAddress}")
    @ResponseStatus(HttpStatus.OK)
    public Attendee getAttendee(@PathVariable("emailAddress") String emailAddress) throws ExecutionException, InterruptedException {
        return authService.getAttendee(emailAddress);
    }
    @GetMapping(path ="getExhibitor/{emailAddress}")
    @ResponseStatus(HttpStatus.OK)
    public Exhibitor getExhibitor(@PathVariable("emailAddress") String emailAddress) throws ExecutionException, InterruptedException {
        return authService.getExhibitor(emailAddress);
    }
    @GetMapping(path ="getExhibitionOwner/{emailAddress}")
    @ResponseStatus(HttpStatus.OK)
    public ExhibitionOwner getExhibitionOwner(@PathVariable("emailAddress") String emailAddress) throws ExecutionException, InterruptedException {
        return authService.getExhibitionOwner(emailAddress);
    }
    @PutMapping(path ="updateAdmin/{prevEmail}")
    @ResponseStatus(HttpStatus.OK)
    public String updateAdmin(@RequestBody AdminRegistrationRequest request, @PathVariable String prevEmail) throws ExecutionException, InterruptedException {
        return authService.updateAdmin(request, prevEmail);
    }
    @PutMapping(path ="updateAttendee/{prevEmail}")
    @ResponseStatus(HttpStatus.OK)
    public String updateAttendee(@RequestBody AttendeeRegistrationRequest request, @PathVariable String prevEmail) throws ExecutionException, InterruptedException {
        return authService.updateAttendee(request, prevEmail);
    }
    @PutMapping(path ="updateExhibitor/{prevEmail}")
    @ResponseStatus(HttpStatus.OK)
    public String updateExhibitor(@RequestBody ExhibitorRegistrationRequest request, @PathVariable String prevEmail) throws ExecutionException, InterruptedException {
        return authService.updateExhibitor(request, prevEmail);
    }
    @PutMapping(path ="updateExhibitionOwner/{prevEmail}")
    @ResponseStatus(HttpStatus.OK)
    public String updateExhibitionOwner(@RequestBody ExhibitionOwnerRegistrationRequest request, @PathVariable String prevEmail) throws ExecutionException, InterruptedException {
        return authService.updateExhibitionOwner(request, prevEmail);
    }
    @PutMapping(path ="confirm/{emailAddress}")
    @ResponseStatus(HttpStatus.OK)
    public String confirm(@PathVariable("emailAddress") String emailAddress) throws ExecutionException, InterruptedException {
        return authService.confirm(emailAddress);
    }
    @DeleteMapping(path ="delete/{emailAddress}")
    @ResponseStatus(HttpStatus.OK)
    public String delete (@PathVariable("emailAddress") String emailAddress) throws ExecutionException, InterruptedException {
        return authService.deleteUser(emailAddress);
    }
    @PostMapping(path ="login")
    @ResponseStatus(HttpStatus.OK)
    public String login(@RequestBody LoginRequest request, HttpServletResponse response) throws ExecutionException, InterruptedException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        return loginService.login(request);
    }

    @PutMapping(path ="forgotPassword/{emailAddress}")
    @ResponseStatus(HttpStatus.OK)
    public String forgotPassword(@PathVariable("emailAddress") String emailAddress) throws ExecutionException, InterruptedException {
        return loginService.forgotPassword(emailAddress);
    }
    
}