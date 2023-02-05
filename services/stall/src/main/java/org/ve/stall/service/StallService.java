package org.ve.stall.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ve.stall.StallRunner;
import org.ve.stall.model.Stall;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
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
import java.util.Date;
import java.util.Objects;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.CancellationException;
import static org.ve.stall.common.Constants.*;
@Service
public class StallService {

    public String addStall(Stall stall, int stallId) throws InterruptedException, ExecutionException{

        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("stalls")
                .document(Integer.toString(stallId)).set(stall);
        return collectionApiFuture.get().getUpdateTime().toString();
    }
    public ResponseEntity<String> uploadLogo(MultipartFile multipartFile) throws IOException {
        String objectName = generateFileName(multipartFile);
        ClassLoader classLoader = StallRunner.class.getClassLoader();
        File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getFile());
        FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());
        File file2 = convertMultiPartToFile(multipartFile);
        Path filePath = file2.toPath();

        Storage storage = StorageOptions.newBuilder().setCredentials(GoogleCredentials.fromStream(serviceAccount)).setProjectId(FIREBASE_PROJECT_ID).build().getService();
        BlobId blobId = BlobId.of(FIREBASE_BUCKET, objectName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(multipartFile.getContentType()).build();
        String url = "https://firebasestorage.googleapis.com/v0/b/"+FIREBASE_BUCKET+"/o/"+objectName+"?alt=media";

        storage.create(blobInfo, Files.readAllBytes(filePath));
        String DOWNLOAD_URL = null;
        String imageUrl;
        //imageUrl = String.format(DOWNLOAD_URL, URLEncoder.encode(objectName, StandardCharsets.UTF_8));
        JSONObject obj=new JSONObject();
        obj.put("logoUrl",url);
        System.out.print(obj);
        int stallId =1;
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("stalls")
                .document(Integer.toString(stallId)).update(obj);


        return ResponseEntity.status(HttpStatus.CREATED).body("success");

    }

    public ResponseEntity<String> uploadBanner(MultipartFile multipartFile) throws IOException {
        String objectName = generateFileName(multipartFile);
        ClassLoader classLoader = StallRunner.class.getClassLoader();
        File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getFile());
        FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());
        File file2 = convertMultiPartToFile(multipartFile);
        Path filePath = file2.toPath();

        Storage storage = StorageOptions.newBuilder().setCredentials(GoogleCredentials.fromStream(serviceAccount)).setProjectId(FIREBASE_PROJECT_ID).build().getService();
        BlobId blobId = BlobId.of(FIREBASE_BUCKET, objectName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(multipartFile.getContentType()).build();
        String url = "https://firebasestorage.googleapis.com/v0/b/"+FIREBASE_BUCKET+"/o/"+objectName+"?alt=media";

        storage.create(blobInfo, Files.readAllBytes(filePath));
        String DOWNLOAD_URL = null;
        String imageUrl;
        //imageUrl = String.format(DOWNLOAD_URL, URLEncoder.encode(objectName, StandardCharsets.UTF_8));
        JSONObject obj=new JSONObject();
        obj.put("bannerUrl",url);
        int stallId =1;
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("stalls")
                .document(Integer.toString(stallId)).update(obj);


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
