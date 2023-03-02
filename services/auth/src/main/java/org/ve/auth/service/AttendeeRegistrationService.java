package org.ve.auth.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.ve.auth.controller.AttendeeRegistrationRequest;
import org.ve.auth.model.Attendee;
import org.ve.auth.model.UserRole;
import org.ve.auth.validators.ContactNoValidator;
import org.ve.auth.validators.EmailValidator;
import org.ve.auth.validators.NicValidator;

import java.util.concurrent.ExecutionException;

@Service
@AllArgsConstructor
public class AttendeeRegistrationService {
    private final EmailValidator emailValidator;
    private final NicValidator nicValidator;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public String register(AttendeeRegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmailAddress());
        if (!isValidEmail){
            throw new IllegalStateException("email not valid");
        }
        boolean isEmailTaken = emailValidator.isEmailTaken(request.getEmailAddress());
        if (isEmailTaken){
            throw new IllegalStateException("email is taken");
        }
        boolean isNicValid = nicValidator.isValidNic(request.getNic());
        if (!isNicValid){
            throw new IllegalStateException("Nic not valid");
        }
        String link = "http://localhost:8080/api/auth/confirm?emailAddress="+request.getEmailAddress();
//        sendEmail(request.getEmailAddress(),request.getName(),link);
        String token = signUpUser(
                new Attendee(
                        request.getEmailAddress(),
                        request.getName(),
                        request.getNic(),
                        request.getPassword(),
                        UserRole.ATTENDEE
                )
        );
        return token;
    }
    //    public void sendEmail(String emailAddress,String name,String link) {
//        String to = emailAddress;
//        String subject = name;
//        String text = "This is a test email from Spring Boot: " + link;
//
//        try {
//            emailSenderService.sendSimpleEmail(to, subject, text);
//            System.out.println("Email sent successfully.");
//        } catch (MessagingException e) {
//            e.printStackTrace();
//        }
//    }

    public String signUpUser(Attendee attendee){
        String encodedPassword = bCryptPasswordEncoder.encode(attendee.getPassword());
        attendee.setPassword(encodedPassword);
        Firestore firestore = FirestoreClient.getFirestore();
        firestore.collection("users").document().set(attendee);
        return "Attendee registered successfully!";
    }
}
