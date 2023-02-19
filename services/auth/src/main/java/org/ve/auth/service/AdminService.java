package org.ve.auth.service;

import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.ve.auth.model.Admin;

@Service
public class AdminService implements UserDetailsService{
    private AdminRepository adminRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private final static  String USER_NOT_FOUND = "user with email %s not found";

    @Override
    public UserDetails loadUserByUsername(String emailAddress) throws UsernameNotFoundException{
        return adminRepository.findByEmail(emailAddress).orElseThrow(()-> new UsernameNotFoundException(String.format(USER_NOT_FOUND,emailAddress)));
    }
    public String signUpUser(Admin authAdmin){
        String encodedPassword = bCryptPasswordEncoder.encode(authAdmin.getPassword());
        authAdmin.setPassword(encodedPassword);
        Firestore firestore = FirestoreClient.getFirestore();
        firestore.collection("users").document().set(authAdmin);
        return "Admin registered successfully!";
    }

}
