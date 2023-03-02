package org.ve.auth.tokens;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;

@Component
public class JwtGenerator {
    @Value("${jwt.secret}")
    private String SECRET_KEY;
    public String generateToken(String email, String userRole){
        long currentTime = System.currentTimeMillis();
        long expirationTime = currentTime + 1800000;
        HashMap<String, Object> hm = new HashMap<>();
        hm.put("userRole", userRole);
        return Jwts.builder()
                .setClaims(hm)
                .setSubject(email)
                .setIssuedAt(new Date(currentTime))
                .setExpiration(new Date(expirationTime))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
}
