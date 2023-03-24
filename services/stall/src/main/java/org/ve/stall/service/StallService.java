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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
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
    public ResponseEntity<String> uploadLogo(MultipartFile multipartFile, String stallId, String stallOwnerId, String exhibitionId, String tier) throws IOException {
        String objectName = generateFileName(multipartFile);
        ClassLoader classLoader = StallRunner.class.getClassLoader();
        File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getFile());
        FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());
        File file2 = convertMultiPartToFile(multipartFile);
        Path filePath = file2.toPath();

        Storage storage = StorageOptions.newBuilder().setCredentials(GoogleCredentials.fromStream(serviceAccount)).setProjectId(FIREBASE_PROJECT_ID).build().getService();
        String directoryPath =exhibitionId+"/"+tier+"/"+stallOwnerId+"/"+"logo";
        BlobId blobId = BlobId.of(FIREBASE_BUCKET,directoryPath+"/"+objectName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(multipartFile.getContentType()).build();

        storage.create(blobInfo, Files.readAllBytes(filePath));
        String url= String.format("https://firebasestorage.googleapis.com/v0/b/"+FIREBASE_BUCKET+"/o/%s?alt=media", URLEncoder.encode(directoryPath + "/" + objectName, StandardCharsets.UTF_8));
        JSONObject obj=new JSONObject();
        obj.put("logoUrl",url);
        System.out.print(obj);
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("stalls")
                .document(stallId).update(obj);


        return ResponseEntity.status(HttpStatus.CREATED).body("success");

    }

    public ResponseEntity<String> uploadBanner(MultipartFile multipartFile, String stallId, String stallOwnerId, String exhibitionId, String tier) throws IOException {
        String objectName = generateFileName(multipartFile);
        ClassLoader classLoader = StallRunner.class.getClassLoader();
        File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getFile());
        FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());
        File file2 = convertMultiPartToFile(multipartFile);
        Path filePath = file2.toPath();
        String directoryPath =exhibitionId+"/"+tier+"/"+stallOwnerId+"/"+"banner";
        Storage storage = StorageOptions.newBuilder().setCredentials(GoogleCredentials.fromStream(serviceAccount)).setProjectId(FIREBASE_PROJECT_ID).build().getService();
        BlobId blobId = BlobId.of(FIREBASE_BUCKET, directoryPath+"/"+objectName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(multipartFile.getContentType()).build();

        storage.create(blobInfo, Files.readAllBytes(filePath));

        String url= String.format("https://firebasestorage.googleapis.com/v0/b/"+FIREBASE_BUCKET+"/o/%s?alt=media", URLEncoder.encode(directoryPath + "/" + objectName, StandardCharsets.UTF_8));
        JSONObject obj=new JSONObject();
        obj.put("bannerUrl",url);
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("stalls")
                .document(stallId).update(obj);

        return ResponseEntity.status(HttpStatus.CREATED).body("success");

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
        JSONObject obj=new JSONObject();
        obj.put("videoUrl",url);
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("stalls")
                .document(stallId).update(obj);


        return ResponseEntity.status(HttpStatus.CREATED).body("success");

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
                    Stalls tempStall = new Stalls(element.getString("stallId"),element.getString("stallName"));
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
}
