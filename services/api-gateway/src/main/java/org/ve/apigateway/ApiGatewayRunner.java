package org.ve.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.ve.apigateway.util.JwtUtil;

import java.util.Date;

@SpringBootApplication
public class ApiGatewayRunner {


    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayRunner.class,args);
    }
}