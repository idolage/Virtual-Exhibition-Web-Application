package org.ve.auth.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.ve.auth.model.Admin;
import org.ve.auth.model.Attendee;
import org.ve.auth.service.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping(path = "api/auth")
@AllArgsConstructor
public class Controller {
    private AdminRegistrationService adminRegistrationService;
    private AttendeeRegistrationService attendeeRegistrationService;
//    private ExhibitorRegistrationService exhibitorRegistrationService;
//    private ExhibitionOwnerRegistrationService exhibitionOwnerRegistrationService;
    private LoginService loginService;
    private AuthService authService;
    @PostMapping(path="adminRegistration")
    public String register(@RequestBody AdminRegistrationRequest request){
        return adminRegistrationService.register(request);
    }
    @PostMapping(path="attendeeRegistration")
    public String register(@RequestBody AttendeeRegistrationRequest request){
        return attendeeRegistrationService.register(request);
    }
//    @PostMapping(path="exhibitionOwnerRegistration")
//    public String register(@RequestBody ExhibitionOwnerRegistrationRequest request){
//        return exhibitionOwnerRegistrationService.register(request);
//    }
//    @PostMapping(path="exhibitorRegistration")
//    public String register(@RequestBody ExhibitorRegistrationRequest request){
//        return exhibitorRegistrationService.register(request);
//    }
    @GetMapping(path ="getAdmin")
    public Admin getAdmin(@RequestParam("emailAddress") String emailAddress) throws ExecutionException, InterruptedException {
        return authService.getAdmin(emailAddress);
    }
    @GetMapping(path ="getAttendee")
    public Attendee getAttendee(@RequestParam("emailAddress") String emailAddress) throws ExecutionException, InterruptedException {
        return authService.getAttendee(emailAddress);
    }
//    @GetMapping(path ="getExhibitor")
//    public Exhibitor getExhibitor(@RequestParam("emailAddress") String emailAddress) throws ExecutionException, InterruptedException {
//        return authService.getExhibitor(emailAddress);
//    }
//    @GetMapping(path ="getExhibitionOwner")
//    public ExhibitionOwner getExhibitionOwner(@RequestParam("emailAddress") String emailAddress) throws ExecutionException, InterruptedException {
//        return authService.getExhibitionOwner(emailAddress);
//    }
    @PostMapping(path ="updateAdmin")
    public String updateAdmin(@RequestBody AdminRegistrationRequest request, @RequestParam String prevEmail) throws ExecutionException, InterruptedException {
        return authService.updateAdmin(request, prevEmail);
    }
    @PostMapping(path ="updateAttendee")
    public String updateAttendee(@RequestBody AttendeeRegistrationRequest request, @RequestParam String prevEmail) throws ExecutionException, InterruptedException {
        return authService.updateAttendee(request, prevEmail);
    }
//    @PostMapping(path ="updateExhibitor")
//    public String updateExhibitor(@RequestBody ExhibitorRegistrationRequest request, @RequestParam String prevEmail) throws ExecutionException, InterruptedException {
//        return authService.updateExhibitor(request, prevEmail);
//    }
//    @PostMapping(path ="updateExhibitionOwner")
//    public String updateAttendee(@RequestBody ExhibitionOwnerRegistrationRequest request, @RequestParam String prevEmail) throws ExecutionException, InterruptedException {
//        return authService.updateExhibitionOwner(request, prevEmail);
//    }
    @GetMapping(path ="confirm")
    public String confirm(@RequestParam("emailAddress") String emailAddress) throws ExecutionException, InterruptedException {
        return authService.confirm(emailAddress);
    }
    @GetMapping(path ="delete")
    public String delete (@RequestParam("emailAddress") String emailAddress) throws ExecutionException, InterruptedException {
        return authService.deleteUser(emailAddress);
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