package org.ve.agoratokenserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

import java.io.IOException;

@SpringBootApplication
@EnableEurekaClient
public class AgoraTokenServerRunner {
    public static void main(String[] args) throws IOException {

        SpringApplication.run(AgoraTokenServerRunner.class,args);
    }
}