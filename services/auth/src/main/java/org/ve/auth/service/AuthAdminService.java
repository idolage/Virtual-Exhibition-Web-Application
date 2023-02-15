package org.ve.auth.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.ve.auth.model.AuthAdmin;
import org.ve.auth.model.UserRole;

import java.util.Base64;
import java.util.concurrent.ExecutionException;

@Service
public class AuthAdminService implements UserDetailsService{
    private AdminRepository adminRepository;
    private EmailValidator emailValidator;
    private final static  String USER_NOT_FOUND = "user with email %s not found";
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        return adminRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException(String.format(USER_NOT_FOUND,email)));
    }

}

//    public String addAdmin(AuthAdmin authAdmin) throws ExecutionException, InterruptedException {
//        byte[] encryptedPwd = Base64.getEncoder().encode(authAdmin.getPwd().getBytes());
////        byte[] decrypt = Base64.getDecoder().decode("aGVsbG8=".getBytes());
////        System.out.println(new String(decrypt));
//        boolean isValidEmail = emailValidator.test(authAdmin.getEmailAddress());
//        if(!isValidEmail){
//            throw new IllegalStateException("Email not valid");
//        }
//        UserRole userRole = UserRole.ADMIN;
//        authAdmin.setPwd(new String(encryptedPwd));
//        authAdmin.setUserRole(userRole);
//        Firestore firestore = FirestoreClient.getFirestore();
//        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("users")
//                .document().set(authAdmin);
//        return collectionApiFuture.get().getUpdateTime().toString();
//    }