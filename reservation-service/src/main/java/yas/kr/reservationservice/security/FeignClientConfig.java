package yas.kr.reservationservice.security;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

@Configuration
public class FeignClientConfig {

    @Bean
    public RequestInterceptor requestInterceptor() {
        return new KeycloakFeignInterceptor();
    }

    private static class KeycloakFeignInterceptor implements RequestInterceptor {
        @Override
        public void apply(RequestTemplate requestTemplate) {
            SecurityContext context = SecurityContextHolder.getContext();
            JwtAuthenticationToken authentication = (JwtAuthenticationToken) context.getAuthentication();
            String tokenValue = authentication.getToken().getTokenValue();
            requestTemplate.header("Authorization","Bearer "+tokenValue);
        }
    }
}
