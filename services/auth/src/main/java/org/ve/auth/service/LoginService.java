package org.ve.auth.service;

import com.google.api.Http;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.ve.auth.controller.LoginRequest;
//import org.ve.auth.email.EmailSenderService;
import org.ve.auth.tokens.JwtGenerator;
import org.ve.auth.tokens.TempPwdGenerator;
import org.ve.auth.validators.EmailValidator;
import org.ve.auth.validators.JwtValidator;

import javax.mail.MessagingException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
@AllArgsConstructor
public class LoginService {
    private final EmailValidator emailValidator;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private TempPwdGenerator tempPwdGenerator;
//    @Autowired
//    private EmailSenderService emailSenderService;
    @Autowired
    private JwtGenerator jwtGenerator;
    private JwtValidator jwtValidator;
    public String login(LoginRequest request) throws ExecutionException, InterruptedException {
        boolean isValidEmail = emailValidator.test(request.getEmailAddress());
        if (!isValidEmail){
            return "{\"token\":\""+"Invalid Email Format"+"\",\"userRole\":\""+null+"\"  }";
        }
        Firestore firestore = FirestoreClient.getFirestore();
        List<QueryDocumentSnapshot> documents = firestore.collection("users").whereEqualTo("emailAddress", request.getEmailAddress()).get().get().getDocuments();
        if (!documents.isEmpty()) {
            String password = documents.get(0).getString("password");
            if (password != null && new BCryptPasswordEncoder().matches(request.getPassword(), password)) {
                boolean enabled = documents.get(0).getBoolean("enabled");
                String userRole = documents.get(0).getString("userRole");
                if(enabled){
                    var token = jwtGenerator.generateToken(request.getEmailAddress(), userRole);
                    return "{\"token\":\"" + token + "\",\"userRole\":\"" + userRole + "\"}";
                }
                else{
                    return "{\"token\":\""+"Please activate your account first"+"\",\"userRole\":\""+null+"\"  }";
                }
            }else {
                return "{\"token\":\""+"Invalid Credentials"+"\",\"userRole\":\""+null+"\"  }";
            }
        }else {
            return "{\"token\":\""+"Invalid Credentials"+"\",\"userRole\":\""+null+"\"  }";
        }
    }

    public String forgotPassword(String emailAddress) throws ExecutionException, InterruptedException {
        String tempPwd = tempPwdGenerator.generateTempPwd();
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = firestore.collection("users").whereEqualTo("emailAddress", emailAddress).get();
        QuerySnapshot snapshot = future.get();
        if (!snapshot.isEmpty()) {
            DocumentReference docRef = snapshot.getDocuments().get(0).getReference();
            docRef.update("password", bCryptPasswordEncoder.encode(tempPwd));
//            sendEmail(emailAddress,tempPwd);
            return "Password updated successfully";
        }
        return "Check your email to see the new password";
    }

    public String validate(String token) {
        Boolean isValid = jwtValidator.validateToken(token);
        if (isValid){
            return "Token is valid";
        }
        return "Token is invalid";
    }
//    public void sendEmail(String emailAddress,String tempPwd) {
//        String to = emailAddress;
//        String subject = "Temporary Password";
//        String text = "Your temp password is: " + tempPwd;
//
//        try {
//            emailSenderService.sendSimpleEmail(to, subject, text);
//            System.out.println("Email sent successfully.");
//        } catch (MessagingException e) {
//            e.printStackTrace();
//        }
//    }
}
