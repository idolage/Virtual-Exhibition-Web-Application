package org.ve.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilterChain;
import org.ve.apigateway.util.JwtUtil;

import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.Date;


@SpringBootApplication
public class ApiGatewayRunner {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayRunner.class, args);
    }

    @Bean
    public CorsWebFilter corsWebFilter() {

        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedMethods(Arrays.asList("*"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("*"));
        corsConfiguration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        CorsWebFilter filter = new CorsWebFilter(source) {
            @Override
            public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
                ServerHttpResponse response = exchange.getResponse();
//                response.getHeaders().add("Access-Control-Allow-Origin", "*");
                response.getHeaders().add("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
                response.getHeaders().add("Access-Control-Allow-Headers", "Authorization, Content-Type");
                response.getHeaders().add("Access-Control-Max-Age", "3600");
                if (HttpMethod.OPTIONS.equals(exchange.getRequest().getMethod())) {
                    response.setStatusCode(HttpStatus.OK);
                    return Mono.empty();
                }
                return chain.filter(exchange);
            }
        };
        System.out.println("CorsWebFilter bean created");
        return filter;
    }


}
