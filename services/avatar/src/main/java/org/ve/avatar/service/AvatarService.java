package org.ve.avatar.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;
import org.ve.avatar.model.Avatar;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CancellationException;
import java.util.concurrent.ExecutionException;
@Service
public class AvatarService {

    public String addAvatar(Avatar avatar) throws InterruptedException, ExecutionException{
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("avatars")
                .document(avatar.getUserId()).set(avatar);
        return collectionApiFuture.get().getUpdateTime().toString();
    }

    public Avatar getAvatar(String documentId) throws InterruptedException, ExecutionException {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection("avatars").document(documentId);
        ApiFuture<DocumentSnapshot> documentSnapshotApiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = documentSnapshotApiFuture.get();
        Avatar avatar;
        if(documentSnapshot.exists()){
            System.out.println(documentSnapshot.toObject(Avatar.class));
            avatar = documentSnapshot.toObject(Avatar.class);
            return avatar;
        }
        return null;
    }

    public List<Avatar> getAvatars() throws CancellationException {
        Firestore firestore = FirestoreClient.getFirestore();
        Iterable<DocumentReference> documentReference = firestore.collection("avatars").listDocuments();
        List<DocumentSnapshot> documentSnapshotApiFuture = new ArrayList<DocumentSnapshot>();
        documentReference.forEach((element)->{ApiFuture<DocumentSnapshot> documentSnapshot = element.get();
            try {
                documentSnapshotApiFuture.add(documentSnapshot.get());
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
        });
        List<Avatar> avatars = new ArrayList<>();
        if(!documentSnapshotApiFuture.isEmpty()){
            documentSnapshotApiFuture.forEach((element)->{
                if(element.exists()){
                    avatars.add(element.toObject(Avatar.class));
                }
            });
            return avatars;
        }
        return null;
    }

    public String updateAvatar(Avatar avatar)throws InterruptedException, ExecutionException{
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("avatars")
                .document(avatar.getUserId()).set(avatar);
        return "Updated "+collectionApiFuture.get().getUpdateTime().toString();
    }

    public String deleteAvatar(String documentId){
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("avatars")
                .document(documentId).delete();
        return "Successfully deleted "+documentId;
    }
}
