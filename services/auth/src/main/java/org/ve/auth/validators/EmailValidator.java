package org.ve.auth.validators;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.firebase.cloud.FirestoreClient;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class EmailValidator implements Predicate<String>{
    @Override
    public boolean test(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@(.+)$";

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);

        if (matcher.matches()) {
            return true;
        } else {
            return false;
        }
    }

    @SneakyThrows
    public boolean isEmailTaken(String email){
        Firestore firestore = FirestoreClient.getFirestore();
        List<QueryDocumentSnapshot> documents = firestore.collection("users").whereEqualTo("emailAddress", email)
                .get().get().getDocuments();
        if (documents.isEmpty()) {
            return false;
        } else {
            return true;
        }
    }
}
