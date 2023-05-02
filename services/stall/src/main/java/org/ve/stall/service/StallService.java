package org.ve.stall.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;
import org.ve.stall.StallRunner;
import org.ve.stall.dto.Stalls;
import org.ve.stall.model.Stall;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.json.simple.JSONObject;


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

import static org.ve.stall.common.Constants.*;
@Service
public class StallService {

    public String addStall(Stall stall, String stallId) throws InterruptedException, ExecutionException{

        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("stalls")
                .document(stallId).set(stall);
        return collectionApiFuture.get().getUpdateTime().toString();
    }
    public ResponseEntity<String> uploadLogo( String exhibitionId,String stallId,String logo, String stallOwnerId,  String tier) throws IOException {

        Firestore firestore = FirestoreClient.getFirestore();
        Query query = firestore.collection("stalls").whereEqualTo("stallId", stallId).whereEqualTo("exhibitionId", exhibitionId);
        ApiFuture<QuerySnapshot> querySnapshotFuture = query.get();
        try {
            QuerySnapshot querySnapshot = querySnapshotFuture.get();

            for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
                String documentId = document.getId();

                // Update the logoUrl field of the document
                DocumentReference documentRef = firestore.collection("stalls").document(documentId);
                Map<String, Object> updateData = new HashMap<>();
                updateData.put("logoUrl", logo);
                ApiFuture<WriteResult> updateFuture = documentRef.update(updateData);
            }

            // Return a success response
            return ResponseEntity.ok("Success");
        } catch (InterruptedException | ExecutionException e) {
            System.err.println("Error: " + e.getMessage());

            // Return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update.");
        }

    }

    public ResponseEntity<String> uploadBanners(List<MultipartFile> multipartFiles, String stallId, String exhibitionId,String stallOwnerId,  String tier) throws IOException {

        ClassLoader classLoader = StallRunner.class.getClassLoader();
        File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getFile());
        FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());
        Storage storage = StorageOptions.newBuilder().setCredentials(GoogleCredentials.fromStream(serviceAccount)).setProjectId(FIREBASE_PROJECT_ID).build().getService();
        Firestore firestore = FirestoreClient.getFirestore();
        Query query = firestore.collection("stalls").whereEqualTo("stallId", stallId).whereEqualTo("exhibitionId", exhibitionId);
        ApiFuture<QuerySnapshot> querySnapshotFuture = query.get();
        try {
            QuerySnapshot querySnapshot = querySnapshotFuture.get();

            for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
                String documentId = document.getId();

                // Update the bannerUrl field of the document
                DocumentReference documentRef = firestore.collection("stalls").document(documentId);
                for(int i=0; i<multipartFiles.size();i++){
                    MultipartFile multipartFile = multipartFiles.get(i);
                    String objectName = generateFileName(multipartFile);
                    File file2 = convertMultiPartToFile(multipartFile);
                    Path filePath = file2.toPath();
                    String directoryPath =exhibitionId+"/"+tier+"/"+stallOwnerId+"/"+"banner";
                    BlobId blobId = BlobId.of(FIREBASE_BUCKET, directoryPath+"/"+objectName);
                    BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(multipartFile.getContentType()).build();

                    storage.create(blobInfo, Files.readAllBytes(filePath));

                    String url= String.format("https://firebasestorage.googleapis.com/v0/b/"+FIREBASE_BUCKET+"/o/%s?alt=media", URLEncoder.encode(directoryPath + "/" + objectName, StandardCharsets.UTF_8));
                    String fieldName = "bannerUrl" + (i + 1);
                    Map<String, Object> fieldUpdate = new HashMap<>();
                    fieldUpdate.put(fieldName, url);
                    documentRef.update(fieldUpdate);
                }

            }

            // Return a success response
            return ResponseEntity.ok("Success");
        }catch (InterruptedException | ExecutionException e) {
            System.err.println("Error: " + e.getMessage());

            // Return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update.");
        }

    }

    public ResponseEntity<String> uploadVideo(MultipartFile multipartFile,String stallId, String stallOwnerId, String exhibitionId, String tier) throws IOException {
        String objectName = generateFileName(multipartFile);
        ClassLoader classLoader = StallRunner.class.getClassLoader();
        File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getFile());
        FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());
        File file2 = convertMultiPartToFile(multipartFile);
        Path filePath = file2.toPath();
        String directoryPath =exhibitionId+"/"+tier+"/"+stallOwnerId+"/"+"videos";
        Storage storage = StorageOptions.newBuilder().setCredentials(GoogleCredentials.fromStream(serviceAccount)).setProjectId(FIREBASE_PROJECT_ID).build().getService();
        BlobId blobId = BlobId.of(FIREBASE_BUCKET, directoryPath+"/"+objectName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(multipartFile.getContentType()).build();
        storage.create(blobInfo, Files.readAllBytes(filePath));

        String url= String.format("https://firebasestorage.googleapis.com/v0/b/"+FIREBASE_BUCKET+"/o/%s?alt=media", URLEncoder.encode(directoryPath + "/" + objectName, StandardCharsets.UTF_8));
        Firestore firestore = FirestoreClient.getFirestore();
        Query query = firestore.collection("stalls").whereEqualTo("stallId", stallId).whereEqualTo("exhibitionId", exhibitionId);
        ApiFuture<QuerySnapshot> querySnapshotFuture = query.get();
        try {
            QuerySnapshot querySnapshot = querySnapshotFuture.get();

            for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
                String documentId = document.getId();

                // Update the 3DModel field of the document
                DocumentReference documentRef = firestore.collection("stalls").document(documentId);
                Map<String, Object> updateData = new HashMap<>();
                updateData.put("videoUrl", url);
                ApiFuture<WriteResult> updateFuture = documentRef.update(updateData);
            }

            // Return a success response
            return ResponseEntity.ok("Success");
        } catch (InterruptedException | ExecutionException e) {
            System.err.println("Error: " + e.getMessage());

            // Return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update.");
        }

    }

    public ResponseEntity<String> upload3DModel(MultipartFile multipartFile,String stallId, String stallOwnerId, String exhibitionId, String tier) throws IOException {
        String objectName = generateFileName(multipartFile);
        ClassLoader classLoader = StallRunner.class.getClassLoader();
        File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getFile());
        FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());
        File file2 = convertMultiPartToFile(multipartFile);
        Path filePath = file2.toPath();
        String directoryPath =exhibitionId+"/"+tier+"/"+stallOwnerId+"/"+"models";
        Storage storage = StorageOptions.newBuilder().setCredentials(GoogleCredentials.fromStream(serviceAccount)).setProjectId(FIREBASE_PROJECT_ID).build().getService();
        BlobId blobId = BlobId.of(FIREBASE_BUCKET, directoryPath+"/"+objectName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(multipartFile.getContentType()).build();
        storage.create(blobInfo, Files.readAllBytes(filePath));

        String url= String.format("https://firebasestorage.googleapis.com/v0/b/"+FIREBASE_BUCKET+"/o/%s?alt=media", URLEncoder.encode(directoryPath + "/" + objectName, StandardCharsets.UTF_8));
        Firestore firestore = FirestoreClient.getFirestore();
        Query query = firestore.collection("stalls").whereEqualTo("stallId", stallId).whereEqualTo("exhibitionId", exhibitionId);
        ApiFuture<QuerySnapshot> querySnapshotFuture = query.get();
        try {
            QuerySnapshot querySnapshot = querySnapshotFuture.get();

            for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
                String documentId = document.getId();

                // Update the 3DModel field of the document
                DocumentReference documentRef = firestore.collection("stalls").document(documentId);
                Map<String, Object> updateData = new HashMap<>();
                updateData.put("model", url);
                ApiFuture<WriteResult> updateFuture = documentRef.update(updateData);
            }

            // Return a success response
            return ResponseEntity.ok("3DModel field updated successfully for all matching stalls.");
        } catch (InterruptedException | ExecutionException e) {
            System.err.println("Error retrieving stalls: " + e.getMessage());

            // Return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update 3DModel field.");
        }

    }
    public List<Stall> getAllStalls() {
        Firestore firestore = FirestoreClient.getFirestore();
        Iterable<DocumentReference> documentReference = firestore.collection("stalls").listDocuments();
        List<DocumentSnapshot> documentSnapshotApiFuture = new ArrayList<DocumentSnapshot>();
        documentReference.forEach((element)->{ApiFuture<DocumentSnapshot> documentSnapshot = element.get();
            try {
                documentSnapshotApiFuture.add(documentSnapshot.get());
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
        });
        List<Stall> stalls = new ArrayList<>();
        if(!documentSnapshotApiFuture.isEmpty()){
            documentSnapshotApiFuture.forEach((element)->{
                if(element.exists()){
                    stalls.add(element.toObject(Stall.class));
                }
            });
            return stalls;
        }
        return null;
    }

    public List<Stall> getStallsByOwner(String stallOwnerId) throws CancellationException, ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        // asynchronously retrieve multiple documents
        ApiFuture<QuerySnapshot> future = firestore.collection("stalls").whereEqualTo("stallOwnerId", stallOwnerId).get();
// future.get() blocks on response
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Stall> stalls = new ArrayList<>();
        if (!documents.isEmpty()) {
            documents.forEach((element) -> {
                if (element.exists()) {
                    stalls.add(element.toObject(Stall.class));
                }
            });
            return stalls;
        }
        return null;
    }

    public ResponseEntity<?> getBookedStalls(String exhibitionId) throws CancellationException, ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        // asynchronously retrieve multiple documents
        ApiFuture<QuerySnapshot> future = firestore.collection("stalls").whereEqualTo("exhibitionId", exhibitionId).get();
// future.get() blocks on response
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Stalls> stalls = new ArrayList<>();
        if (!documents.isEmpty()) {
            documents.forEach((element) -> {
                if (element.exists()) {
                    Stalls tempStall = new Stalls(element.getString("stallId"),element.getString("stallName"),element.getString("stallColor"));
                    stalls.add((tempStall));
                }
            });
        }
        return new ResponseEntity<>(stalls.toArray(new Stalls[0]), HttpStatus.OK);
    }

    public String getBookedStall(String exhibitionId, String stallOwnerId) throws CancellationException, ExecutionException, InterruptedException{
        Firestore firestore = FirestoreClient.getFirestore();
        List<QueryDocumentSnapshot> documents = firestore.collection("stalls")
                .whereEqualTo("exhibitionId",exhibitionId).whereEqualTo("stallOwnerId",stallOwnerId).get().get().getDocuments();
        if(!documents.isEmpty()){
            return documents.get(0).getString("stallId");
        }
        return "Document empty";
    }

    public String deleteStall(String stallId) {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("stalls")
                .document(stallId).delete();
        return "Successfully deleted "+stallId;
    }
    public String updateStall(Stall stall, String stallId)throws InterruptedException, ExecutionException{
        JSONObject obj=new JSONObject();
        if(stall.getExhibitionId()!=null)
        {obj.put("exhibitionId",stall.getExhibitionId());}
        if(stall.getStallOwnerId()!=null)
        {obj.put("stallOwnerId",stall.getStallOwnerId());}
        if(stall.getStallOwnerId()!=null)
        {obj.put("stallName",stall.getStallName());}
        if(stall.getStallColor()!=null)
        {obj.put("stallColor",stall.getStallColor());}
        if(stall.getTier()!=null)
        {obj.put("tier",stall.getTier());}
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("stalls")
                .document(stallId).update(obj);
        return "Updated "+collectionApiFuture.get().getUpdateTime().toString();
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

    public Stall getStallsByExhibition(String exhibitionId, String stallId) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        List<QueryDocumentSnapshot> documents = firestore.collection("stalls").whereEqualTo("exhibitionId",exhibitionId).whereEqualTo("stallId", stallId).get().get().getDocuments();
        return documents.get(0).toObject(Stall.class);
    }
}