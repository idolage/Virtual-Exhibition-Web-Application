package org.ve.exhibition.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;
import org.ve.exhibition.model.Exhibition;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CancellationException;
import java.util.concurrent.ExecutionException;

@Service
public class ExhibitionService {
    public String addExhibition(Exhibition exhibition) throws InterruptedException, ExecutionException{
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("exhibitions")
                .document().set(exhibition);
        return collectionApiFuture.get().getUpdateTime().toString();
    }

    public Exhibition getExhibition(String documentId) throws InterruptedException, ExecutionException {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection("exhibitions").document(documentId);
        ApiFuture<DocumentSnapshot> documentSnapshotApiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = documentSnapshotApiFuture.get();
        Exhibition exhibition;
        if(documentSnapshot.exists()){
            exhibition = documentSnapshot.toObject(Exhibition.class);
            return exhibition;
        }
        return null;
    }

    public List<Exhibition> getExhibitions() throws CancellationException {
        Firestore firestore = FirestoreClient.getFirestore();
        Iterable<DocumentReference> documentReference = firestore.collection("exhibitions").listDocuments();
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
        List<Exhibition> exhibitions = new ArrayList<>();
        if(!documentSnapshotApiFuture.isEmpty()){
            documentSnapshotApiFuture.forEach((element)->{
                if(element.exists()){
                    exhibitions.add(element.toObject(Exhibition.class));
                }
            });
            return exhibitions;
        }
        return null;
    }

    public String updateExhibition(Exhibition exhibition, String documentId)throws InterruptedException, ExecutionException{
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("exhibitions")
                .document(documentId).set(exhibition);
        return "Updated "+collectionApiFuture.get().getUpdateTime().toString();
    }

    public String deleteExhibition(String documentId){
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("exhibitions")
                .document(documentId).delete();
        return "Successfully deleted "+documentId;
    }
}
