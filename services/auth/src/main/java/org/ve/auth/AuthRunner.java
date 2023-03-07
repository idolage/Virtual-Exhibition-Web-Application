package org.ve.auth;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Objects;

@EnableEurekaClient
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class AuthRunner {
    public static void main(String []args) throws IOException {
        ClassLoader classLoader = AuthRunner.class.getClassLoader();
        File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getFile());
    FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());
      //  FileInputStream serviceAccount = new FileInputStream("C:\\Users\\USER\\Unity Projects\\Virtual-Exhibition-Web-Application\\services\\auth\\src\\main\\resources\\serviceAccountKey.json");
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount)).build();
        FirebaseApp.initializeApp(options);
        SpringApplication.run(AuthRunner.class,args);
    }
}
