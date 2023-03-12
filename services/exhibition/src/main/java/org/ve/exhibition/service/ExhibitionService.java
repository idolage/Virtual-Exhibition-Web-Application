package org.ve.exhibition.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.ve.exhibition.dto.ExhibitionOwner;
import org.ve.exhibition.dto.ExhibitionResponse;
import org.ve.exhibition.model.Exhibition;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CancellationException;
import java.util.concurrent.ExecutionException;

@Service
public class ExhibitionService {
    @Autowired
    private RestTemplate restTemplate;

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
    public ResponseEntity<?> getExhibition(String Id) throws InterruptedException, ExecutionException {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection("exhibitions").document(Id);
        ApiFuture<DocumentSnapshot> documentSnapshotApiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = documentSnapshotApiFuture.get();
        Exhibition exhibition;
        if(documentSnapshot.exists()){
            exhibition = documentSnapshot.toObject(Exhibition.class);
            if(exhibition != null){
                ExhibitionOwner exhibitionOwner = restTemplate
                        .getForObject("http://AUTH-SERVICE/api/auth/getExhibitionOwner/"+
                                exhibition.getExhibitionOwnerId(), ExhibitionOwner.class);
                ExhibitionResponse exhibitionResponse = new ExhibitionResponse(
                        exhibition.getId(),
                        exhibition.getExhibitionName(),
                        exhibitionOwner,
                        exhibition.getExhibitionId(),
                        exhibition.isStart(),
                        exhibition.isOver(),
                        exhibition.getDatetime()
                );
                return new ResponseEntity<>(exhibitionResponse, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("No exhibition found",HttpStatus.NOT_FOUND);
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
    public String updateExhibition(Exhibition exhibition, String Id)throws InterruptedException, ExecutionException{
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("exhibitions")
                .document(Id).set(exhibition);
        return "Updated "+collectionApiFuture.get().getUpdateTime().toString();
    }

    /*
     * Delete an exhibition
     * @param document id
     */
    public String deleteExhibition(String Id){
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("exhibitions")
                .document(Id).delete();
        return "Successfully deleted "+Id;
    }

    /*
     * Start or End the exhibition
     * @param start
     */
    public String startExhibition(String Id, boolean start) throws InterruptedException, ExecutionException{
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection("exhibitions").document(Id);
        ApiFuture<DocumentSnapshot> documentSnapshotApiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = documentSnapshotApiFuture.get();
        Exhibition exhibition = documentSnapshot.toObject(Exhibition.class);
        if(exhibition!=null){
            exhibition.setStart(start);
            ApiFuture<WriteResult> collectionApiFuture = firestore.collection("exhibitions")
                    .document(Id).set(exhibition);
            if(start){
                return "Started";
            } else {
                return "Ended";
            }
        }
        else{
            return "Exhibition not found";
        }
    }

}
