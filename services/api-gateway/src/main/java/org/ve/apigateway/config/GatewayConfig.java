package org.ve.apigateway.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.ve.apigateway.filter.JwtAuthenticationFilter;

@Configuration
public class GatewayConfig {
    @Autowired
    private JwtAuthenticationFilter filter;
    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
//                .route("AVATAR-SERVICE", r -> r.path("/api/avatar/**").filters(f -> f.filter(filter)).uri("lb://AVATAR-SERVICE"))
//                .route("AUTH-SERVICE", r -> r.path("/api/auth/**").filters(f -> f.filter(filter)).uri("lb://AUTH-SERVICE"))
//                .route("EXHIBITION-SERVICE", r -> r.path("/api/exhibition/**").filters(f -> f.filter(filter)).uri("lb://EXHIBITION-SERVICE"))
//                .route("PAYMENT-SERVICE", r -> r.path("/api/payment/**").filters(f -> f.filter(filter)).uri("lb://PAYMENT-SERVICE"))
//                .route("STALL-SERVICE", r -> r.path("/api/stall/**").filters(f -> f.filter(filter)).uri("lb://STALL-SERVICE"))

                .route("AVATAR-SERVICE", r -> r.path("/api/avatar/**").uri("lb://AVATAR-SERVICE"))
                .route("AUTH-SERVICE", r -> r.path("/api/auth/**").uri("lb://AUTH-SERVICE"))
                .route("EXHIBITION-SERVICE", r -> r.path("/api/exhibition/**").uri("lb://EXHIBITION-SERVICE"))
                .route("PAYMENT-SERVICE", r -> r.path("/api/payment/**").uri("lb://PAYMENT-SERVICE"))
                .route("STALL-SERVICE", r -> r.path("/api/stall/**").uri("lb://STALL-SERVICE"))

                .route("DISCOVERY-SERVER", r -> r.path("/eureka/web").filters(f -> f.setPath("/")).uri("http://localhost:8761"))
                .route("DISCOVERY-SERVER-STATIC", r -> r.path("/eureka/**").uri("http://localhost:8761"))
                .build();
    }

}
