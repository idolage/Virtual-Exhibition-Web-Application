package org.ve.auth.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ve.auth.controller.AdminRegistrationRequest;
//import org.ve.auth.email.EmailSenderService;
import org.ve.auth.validators.ContactNoValidator;
import org.ve.auth.validators.EmailValidator;
import org.ve.auth.model.Admin;
import org.ve.auth.model.UserRole;
import org.ve.auth.validators.NicValidator;

import javax.mail.MessagingException;
import java.util.concurrent.ExecutionException;


@Service
@AllArgsConstructor
public class AdminRegistrationService {
    private final AdminService authAdminService;
    private final EmailValidator emailValidator;
    private final NicValidator nicValidator;
    private final ContactNoValidator contactNoValidator;
//    @Autowired
//    private EmailSenderService emailSenderService;
    public String register(AdminRegistrationRequest request) {

        boolean isValidEmail = emailValidator.test(request.getEmailAddress());
        if (!isValidEmail){
            return ("Invalid Email Format");
        }
        boolean isEmailTaken = emailValidator.isEmailTaken(request.getEmailAddress());
        if (isEmailTaken){
            return("Email is already taken");
        }
        boolean isNicValid = nicValidator.isValidNic(request.getNic());
        if (!isNicValid){
            return(" Invalid NIC number");
        }
        boolean isContactNoValid = contactNoValidator.validateContactNo(request.getContactNo());
        if (!isContactNoValid){
            return ("Contact no is not valid");
        }
        String link = "http://localhost:8080/api/auth/confirm/"+request.getEmailAddress();
//        sendEmail(request.getEmailAddress(),request.getPassword(),request.getName(),link);
        String token = authAdminService.signUpUser(
                new Admin(
                        request.getEmailAddress(),
                        request.getName(),
                        request.getContactNo(),
                        request.getNic(),
                        request.getPassword(),
                        UserRole.ADMIN
                )
        );
        return token;

    }
//    public void sendEmail(String emailAddress,String pwd, String name,String link) {
//        String to = emailAddress;
//        String subject = "Nerambum admin registration";
//        String text = "Hello "+ name + "!<br/>You now have admin privilege to Nerambum!<br/>" +
//                "Your password is: "+pwd+ "<br/>Click on this link to activate your account: "+link;
//
//        try {
//            emailSenderService.sendSimpleEmail(to, subject, text);
//            System.out.println("Email sent successfully.");
//        } catch (MessagingException e) {
//            e.printStackTrace();
//        }
//    }

    public String confirm(String emailAddress) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = firestore.collection("users").whereEqualTo("emailAddress", emailAddress).get();
        QuerySnapshot snapshot = future.get();
        if (!snapshot.isEmpty()) {
            DocumentReference docRef = snapshot.getDocuments().get(0).getReference();
            docRef.update("enabled", true);
            return "User enabled successfully";
        }
        return "Failed to enable user";
    }

}
