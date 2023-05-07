package org.ve.auth.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.ve.auth.controller.AdminRegistrationRequest;
import org.ve.auth.controller.AttendeeRegistrationRequest;
import org.ve.auth.controller.ExhibitionOwnerRegistrationRequest;
import org.ve.auth.controller.ExhibitorRegistrationRequest;
import org.ve.auth.model.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
@AllArgsConstructor
public class AuthService {
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
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

    public Admin getAdmin(String emailAddress) throws ExecutionException, InterruptedException{
        Firestore firestore = FirestoreClient.getFirestore();
        List<QueryDocumentSnapshot> documents = firestore.collection("users").whereEqualTo("emailAddress", emailAddress).get().get().getDocuments();
        if (!documents.isEmpty()) {
            String email = documents.get(0).getString("emailAddress");
            String name = documents.get(0).getString("name");
            String contactNo  = documents.get(0).getString("contactNo");
            String nic  = documents.get(0).getString("nic");
            Admin admin = new Admin(email,name,contactNo, nic,"",UserRole.ADMIN);
            return admin;
        } else{
            return new Admin(null,null,null, null,null,UserRole.INVALID);
        }
    }

    public Attendee getAttendee(String emailAddress) throws ExecutionException, InterruptedException{
        Firestore firestore = FirestoreClient.getFirestore();
        List<QueryDocumentSnapshot> documents = firestore.collection("users").whereEqualTo("emailAddress", emailAddress).get().get().getDocuments();
        if (!documents.isEmpty()) {
            String email = documents.get(0).getString("emailAddress");
            String name = documents.get(0).getString("name");
            String nic  = documents.get(0).getString("nic");
            Attendee attendee = new Attendee(email,name, nic,"",UserRole.ATTENDEE);
            return attendee;
        }else{
            return new Attendee(null,null,null,null,UserRole.INVALID);
        }
    }

    public Exhibitor getExhibitor(String emailAddress) throws ExecutionException, InterruptedException{
        Firestore firestore = FirestoreClient.getFirestore();
        List<QueryDocumentSnapshot> documents = firestore.collection("users").whereEqualTo("emailAddress", emailAddress).get().get().getDocuments();
        if (!documents.isEmpty()) {
            String email = documents.get(0).getString("emailAddress");
            String name = documents.get(0).getString("name");
            String contactNo  = documents.get(0).getString("contactNo");
            String nic  = documents.get(0).getString("nic");
            String company = documents.get(0).getString("company");
            String exhibitionId = documents.get(0).getString("exhibitionId");
            String exhibitionOwnerId = documents.get(0).getString("exhibitionOwnerId");
            Exhibitor exhibitor = new Exhibitor(email,name, contactNo,nic,"",company,UserRole.EXHIBITOR,exhibitionId,exhibitionOwnerId);
            return exhibitor;
        }else{
            return new Exhibitor(null,null,null,null,null,null,UserRole.INVALID,null,null);
        }
    }

    public ExhibitionOwner getExhibitionOwner(String emailAddress) throws ExecutionException, InterruptedException{
        Firestore firestore = FirestoreClient.getFirestore();
        List<QueryDocumentSnapshot> documents = firestore.collection("users").whereEqualTo("emailAddress", emailAddress).get().get().getDocuments();
        if (!documents.isEmpty()) {
            String email = documents.get(0).getString("emailAddress");
            String name = documents.get(0).getString("name");
            String contactNo  = documents.get(0).getString("contactNo");
            String nic  = documents.get(0).getString("nic");
            String company = documents.get(0).getString("company");
            ExhibitionOwner exhibitionOwner = new ExhibitionOwner(email,name, contactNo,nic,"",company,UserRole.EX_OWNER);
            return exhibitionOwner;
        }else{
            return new ExhibitionOwner(null,null,null,null,null,null,UserRole.INVALID);
        }
    }

    public String deleteUser(String emailAddress) throws ExecutionException, InterruptedException{
        Firestore firestore = FirestoreClient.getFirestore();
        CollectionReference usersCollection = firestore.collection("users");
        Query query = usersCollection.whereEqualTo("emailAddress", emailAddress);
        ApiFuture<QuerySnapshot> querySnapshotFuture = query.get();
        QuerySnapshot querySnapshot = querySnapshotFuture.get();
        if (querySnapshot.isEmpty()) {
            return "No documents were found";
        }else {
            DocumentReference documentToDelete = querySnapshot.getDocuments().get(0).getReference();
            documentToDelete.delete();
            return "User deleted successfully";
        }
    }

    public String updateAdmin(AdminRegistrationRequest request, String prevEmail) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = firestore.collection("users").whereEqualTo("emailAddress", prevEmail).get();
        String documentId = future.get().getDocuments().get(0).getId();
        if (!documentId.isEmpty()) {
            Map<String, Object> updateValues = new HashMap<>();
            updateValues.put("emailAddress", request.getEmailAddress());
            updateValues.put("name", request.getName());
            updateValues.put("contactNo", request.getContactNo());
            updateValues.put("nic", request.getNic());
            updateValues.put("password", bCryptPasswordEncoder.encode(request.getPassword()));
            firestore.collection("users").document(documentId).update(updateValues);
            return "Admin updated successfully!";

        }else {
            return "No admin found with email " + prevEmail;
        }
    }

    public String updateAttendee(AttendeeRegistrationRequest request, String prevEmail) throws ExecutionException, InterruptedException{
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = firestore.collection("users").whereEqualTo("emailAddress", prevEmail).get();
        String documentId = future.get().getDocuments().get(0).getId();
        if (!documentId.isEmpty()) {
            Map<String, Object> updateValues = new HashMap<>();
            updateValues.put("emailAddress", request.getEmailAddress());
            updateValues.put("name", request.getName());
            updateValues.put("nic", request.getNic());
            updateValues.put("password", bCryptPasswordEncoder.encode(request.getPassword()));
            firestore.collection("users").document(documentId).update(updateValues);
            return "Attendee updated successfully!";

        }else {
            return "No attendee found with email " + prevEmail;
        }
    }

    public String updateExhibitor(ExhibitorRegistrationRequest request, String prevEmail) throws ExecutionException, InterruptedException{
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = firestore.collection("users").whereEqualTo("emailAddress", prevEmail).get();
        String documentId = future.get().getDocuments().get(0).getId();
        if (!documentId.isEmpty()) {
            Map<String, Object> updateValues = new HashMap<>();
            updateValues.put("emailAddress", request.getEmailAddress());
            updateValues.put("name", request.getName());
            updateValues.put("contactNo", request.getContactNo());
            updateValues.put("nic", request.getNic());
            updateValues.put("password", bCryptPasswordEncoder.encode(request.getPassword()));
            updateValues.put("company", request.getCompany());
            firestore.collection("users").document(documentId).update(updateValues);
            return "Exhibitor updated successfully!";

        }else {
            return "No exhibitor found with email " + prevEmail;
        }
    }

    public String updateExhibitionOwner(ExhibitionOwnerRegistrationRequest request, String prevEmail) throws ExecutionException, InterruptedException{
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = firestore.collection("users").whereEqualTo("emailAddress", prevEmail).get();
        String documentId = future.get().getDocuments().get(0).getId();
        if (!documentId.isEmpty()) {
            Map<String, Object> updateValues = new HashMap<>();
            updateValues.put("emailAddress", request.getEmailAddress());
            updateValues.put("name", request.getName());
            updateValues.put("contactNo", request.getContactNo());
            updateValues.put("nic", request.getNic());
            updateValues.put("password", bCryptPasswordEncoder.encode(request.getPassword()));
            updateValues.put("company", request.getCompany());
            firestore.collection("users").document(documentId).update(updateValues);
            return "Exhibition owner updated successfully!";

        }else {
            return "No exhibition owner found with email " + prevEmail;
        }
    }
}
