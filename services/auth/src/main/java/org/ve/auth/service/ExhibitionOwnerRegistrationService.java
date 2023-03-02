package org.ve.auth.service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.ve.auth.controller.ExhibitionOwnerRegistrationRequest;
import org.ve.auth.model.Attendee;
import org.ve.auth.model.ExhibitionOwner;
import org.ve.auth.model.UserRole;
import org.ve.auth.validators.ContactNoValidator;
import org.ve.auth.validators.EmailValidator;
import org.ve.auth.validators.NicValidator;

@Service
@AllArgsConstructor
public class ExhibitionOwnerRegistrationService {
    private final EmailValidator emailValidator;
    private final NicValidator nicValidator;
    private final ContactNoValidator contactNoValidator;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public String register(ExhibitionOwnerRegistrationRequest request) {
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
        boolean isContactNoValid = contactNoValidator.validateContactNo(request.getContactNo());
        if (!isContactNoValid){
            throw new IllegalStateException("Contact no not valid");
        }
        String link = "http://localhost:8080/api/auth/confirm?emailAddress="+request.getEmailAddress();
//        sendEmail(request.getEmailAddress(),request.getName(),link);
        String token = signUpUser(
                new ExhibitionOwner(
                        request.getEmailAddress(),
                        request.getName(),
                        request.getContactNo(),
                        request.getNic(),
                        request.getPassword(),
                        request.getCompany(),
                        UserRole.EX_OWNER
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

    public String signUpUser(ExhibitionOwner exhibitionOwner){
        String encodedPassword = bCryptPasswordEncoder.encode(exhibitionOwner.getPassword());
        exhibitionOwner.setPassword(encodedPassword);
        Firestore firestore = FirestoreClient.getFirestore();
        firestore.collection("users").document().set(exhibitionOwner);
        return "Exhibition Owner registered successfully!";
    }
}
