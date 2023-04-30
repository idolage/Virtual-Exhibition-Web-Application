package org.ve.auth.service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.ve.auth.controller.ExhibitorRegistrationRequest;
import org.ve.auth.model.ExhibitionOwner;
import org.ve.auth.model.Exhibitor;
import org.ve.auth.model.UserRole;
import org.ve.auth.validators.ContactNoValidator;
import org.ve.auth.validators.EmailValidator;
import org.ve.auth.validators.NicValidator;

@Service
@AllArgsConstructor
public class ExhibitorRegistrationService {
    private final EmailValidator emailValidator;
    private final NicValidator nicValidator;
    private final ContactNoValidator contactNoValidator;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public String register(ExhibitorRegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmailAddress());
        if (!isValidEmail){
            return ("Invalid Email Format");
        }
        boolean isEmailTaken = emailValidator.isEmailTaken(request.getEmailAddress());
        if (isEmailTaken){
            return ("Email Is Already Taken");
        }
        boolean isNicValid = nicValidator.isValidNic(request.getNic());
        if (!isNicValid){
            return ("Invalid NIC number");
        }
        boolean isContactNoValid = contactNoValidator.validateContactNo(request.getContactNo());
        if (!isContactNoValid){
            return ("Contact no is not valid");
        }
        String link = "http://localhost:8080/api/auth/confirm/"+request.getEmailAddress();
//        sendEmail(request.getEmailAddress(),request.getPassword(),request.getName(),link);
        String token = signUpUser(
                new Exhibitor(
                        request.getEmailAddress(),
                        request.getName(),
                        request.getContactNo(),
                        request.getNic(),
                        request.getPassword(),
                        request.getCompany(),
                        UserRole.EXHIBITOR,
                        request.getExhibitionId()
                )
        );
        return token;
    }
    //    public void sendEmail(String emailAddress,String pwd,String name,String link) {
//        String to = emailAddress;
//        String subject = "Nerambum exhibitor registration";
//        String text = "Hello "+ name + "!<br/>Welcome to Nerambum!<br/>" +
////                "Your password is: "+pwd+ "<br/>Click on this link to activate your account: "+link;
//
//        try {
//            emailSenderService.sendSimpleEmail(to, subject, text);
//            System.out.println("Email sent successfully.");
//        } catch (MessagingException e) {
//            e.printStackTrace();
//        }
//    }

    public String signUpUser(Exhibitor exhibitor){
        String encodedPassword = bCryptPasswordEncoder.encode(exhibitor.getPassword());
        exhibitor.setPassword(encodedPassword);
        Firestore firestore = FirestoreClient.getFirestore();
        firestore.collection("users").document().set(exhibitor);
        return "Exhibitor registered successfully! Confirmation email is sent to the provided email";
    }
}
