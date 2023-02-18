package org.ve.exhibition.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;
import org.ve.exhibition.model.Exhibition;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.CancellationException;
import java.util.concurrent.ExecutionException;

@Service
public class ExhibitionService {
    /*
    * Add an exhibition
    * @param exhibition instance
    */
    public String addExhibition(Exhibition exhibition) throws InterruptedException, ExecutionException{
        Firestore firestore = FirestoreClient.getFirestore();
        exhibition.setExhibitionId(UUID.randomUUID().toString()); //set exhibition id
        exhibition.setStart(false); //set exhibition start false
        DocumentReference documentReference =  firestore.collection("exhibitions").document();
        exhibition.setId(documentReference.getId());
        ApiFuture<WriteResult> collectionApiFuture = documentReference.set(exhibition);
        return collectionApiFuture.get().getUpdateTime().toString();
    }

    /*
     * Get an exhibition
     * @param document id
     */
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

    /*
     * Get all exhibitions
     */
    public List<Exhibition> getExhibitions() throws CancellationException {
        Firestore firestore = FirestoreClient.getFirestore();
        Iterable<DocumentReference> documentReference = firestore.collection("exhibitions").listDocuments();
        List<DocumentSnapshot> documentSnapshotApiFuture = new ArrayList<DocumentSnapshot>();
        documentReference.forEach((element)->{ApiFuture<DocumentSnapshot> documentSnapshot = element.get();
            try {
                documentSnapshotApiFuture.add(documentSnapshot.get());
            } catch (InterruptedException | ExecutionException e) {
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

    public Exhibition getExhibitionByExhibitionId(String exhibitionId) throws CancellationException,InterruptedException,ExecutionException{
        Firestore firestore = FirestoreClient.getFirestore();
        List<QueryDocumentSnapshot> documents = firestore.collection("exhibitions")
                .whereEqualTo("exhibitionId",exhibitionId).get().get().getDocuments();
        return documents.get(0).toObject(Exhibition.class);
    }

    /*
     * Update an exhibition
     * @param exhibition instance and its document id
     */
    public String updateExhibition(Exhibition exhibition, String documentId)throws InterruptedException, ExecutionException{
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("exhibitions")
                .document(documentId).set(exhibition);
        return "Updated "+collectionApiFuture.get().getUpdateTime().toString();
    }

    /*
     * Delete an exhibition
     * @param document id
     */
    public String deleteExhibition(String documentId){
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("exhibitions")
                .document(documentId).delete();
        return "Successfully deleted "+documentId;
    }

    /*
     * Start or End the exhibition
     * @param start
     */
    public String startExhibition(String documentId, boolean start) throws InterruptedException, ExecutionException{
        Exhibition exhibition = getExhibition(documentId);
        exhibition.setStart(start);
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("exhibitions")
                .document(documentId).set(exhibition);
        if(start){
            return "Started";
        } else {
            return "Ended";
        }
    }

}
