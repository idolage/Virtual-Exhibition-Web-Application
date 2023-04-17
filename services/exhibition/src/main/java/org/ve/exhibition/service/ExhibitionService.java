package org.ve.exhibition.service;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.*;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.ve.exhibition.ExhibitionRunner;
import org.ve.exhibition.dto.ExhibitionOwner;
import org.ve.exhibition.dto.ExhibitionResponse;
import org.ve.exhibition.model.Exhibition;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.concurrent.CancellationException;
import java.util.concurrent.ExecutionException;
import static org.ve.exhibition.common.Constants.*;
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
                        exhibition.getTicketPrice(),
                        exhibition.isStart(),
                        exhibition.isOver(),
                        exhibition.getDatetime(),
                        exhibition.getSponsorVideoUrl1(),
                        exhibition.getSponsorVideoUrl2(),
                        exhibition.getSponsorVideoUrl3(),
                        exhibition.getSponsorVideoUrl4()
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

    public ResponseEntity<String> uploadSponsorVideos(List<MultipartFile> multipartFiles, String Id) throws IOException { ClassLoader classLoader = ExhibitionRunner.class.getClassLoader();
        File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getFile());
        FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());
        Storage storage = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setProjectId(FIREBASE_PROJECT_ID)
                .build()
                .getService();
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection("exhibitions").document(Id);

        for (int i = 0; i < multipartFiles.size(); i++) {
            MultipartFile multipartFile = multipartFiles.get(i);
            String objectName = generateFileName(multipartFile);
            File file2 = convertMultiPartToFile(multipartFile);
            Path filePath = file2.toPath();
            String directoryPath = Id + "/videos";
            BlobId blobId = BlobId.of(FIREBASE_BUCKET, directoryPath + "/" + objectName);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                    .setContentType(multipartFile.getContentType())
                    .build();
            storage.create(blobInfo, Files.readAllBytes(filePath));

            String url = String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media",
                    FIREBASE_BUCKET,
                    URLEncoder.encode(directoryPath + "/" + objectName, StandardCharsets.UTF_8));
            String fieldName = "sponsorVideoUrl" + (i + 1);
            Map<String, Object> fieldUpdate = new HashMap<>();
            fieldUpdate.put(fieldName, url);
            documentReference.update(fieldUpdate);
        }


        return ResponseEntity.status(HttpStatus.CREATED).body("success");
    }
    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        FileOutputStream fos = new FileOutputStream(convertedFile);
        fos.write(file.getBytes());
        fos.close();
        return convertedFile;
    }
    private String generateFileName(MultipartFile multiPart) {
        return new Date().getTime() + "-" + Objects.requireNonNull(multiPart.getOriginalFilename()).replace(" ", "_");
    }
}
