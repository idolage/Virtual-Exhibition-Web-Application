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
//                .route("AVATAR-SERVICE", r -> r.path("/api/avatars/**").filters(f -> f.filter(filter)).uri("lb://AVATAR-SERVICE"))
//                .route("AUTH-SERVICE", r -> r.path("/api/auth/**").filters(f -> f.filter(filter)).uri("lb://AUTH-SERVICE"))
//                .route("EXHIBITION-SERVICE", r -> r.path("/api/exhibitions/**").filters(f -> f.filter(filter)).uri("lb://EXHIBITION-SERVICE"))
//                .route("PAYMENT-SERVICE", r -> r.path("/api/payments/**").filters(f -> f.filter(filter)).uri("lb://PAYMENT-SERVICE"))
//                .route("STALL-SERVICE", r -> r.path("/api/stalls/**").filters(f -> f.filter(filter)).uri("lb://STALL-SERVICE"))
//                .route("TICKET-SERVICE", r -> r.path("/api/tickets/**").filters(f -> f.filter(filter)).uri("lb://TICKET-SERVICE"))
//                .route("PAYMENT-GATEWAY-SERVICE", r -> r.path("/api/payment-gateway/**").filters(f -> f.filter(filter)).uri("lb://PAYMENT-GATEWAY-SERVICE"))
//                .route("STALL-SERVICE", r -> r.path("/api/agora/**").filters(f -> f.filter(filter)).uri("lb://AGORA-TOKEN-SERVICE"))
//                .route("DISCOVERY-SERVER", r -> r.path("/eureka/web").filters(f -> f.setPath("/")).uri("http://localhost:8761"))
//                .route("DISCOVERY-SERVER-STATIC", r -> r.path("/eureka/**").uri("http://localhost:8761"))



                .route("AVATAR-SERVICE", r -> r.path("/api/avatars/**").uri("lb://AVATAR-SERVICE"))
                .route("AUTH-SERVICE", r -> r.path("/api/auth/**").uri("lb://AUTH-SERVICE"))
                .route("EXHIBITION-SERVICE", r -> r.path("/api/exhibitions/**").uri("lb://EXHIBITION-SERVICE"))
                .route("PAYMENT-SERVICE", r -> r.path("/api/payments/**").uri("lb://PAYMENT-SERVICE"))
                .route("STALL-SERVICE", r -> r.path("/api/stalls/**").uri("lb://STALL-SERVICE"))
                .route("TICKET-SERVICE", r -> r.path("/api/tickets/**").uri("lb://TICKET-SERVICE"))
                .route("PAYMENT-GATEWAY-SERVICE", r -> r.path("/api/payment-gateway/**").uri("lb://PAYMENT-GATEWAY-SERVICE"))
                .route("AGORA-TOKEN-SERVICE", r -> r.path("/api/agora/**").uri("lb://AGORA-TOKEN-SERVICE"))
                .route("DISCOVERY-SERVER", r -> r.path("/eureka/web").filters(f -> f.setPath("/")).uri("http://localhost:8761"))
                .route("DISCOVERY-SERVER-STATIC", r -> r.path("/eureka/**").uri("http://localhost:8761"))


                .build();
    }

}
