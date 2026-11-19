package com.watchlist.backend.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.nimbusds.jose.crypto.MACVerifier;
import java.text.ParseException;

@Service
public class JwtService {

    private final SecretKey secretKey;

    public JwtService(@Value("${app.jwt.secret}") String secret) {
        byte[] keyBytes = java.util.Base64.getDecoder().decode(secret);
        this.secretKey = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    public String generateToken(UUID userId) {
        try {
            Instant now = Instant.now();

            JWTClaimsSet claims = new JWTClaimsSet.Builder()
                    .subject(userId.toString())
                    .issueTime(java.util.Date.from(now))
                    .expirationTime(java.util.Date.from(now.plus(7, ChronoUnit.DAYS)))
                    .build();

            SignedJWT jwt = new SignedJWT(
                    new JWSHeader(JWSAlgorithm.HS256),
                    claims);

            jwt.sign(new MACSigner(secretKey.getEncoded()));

            return jwt.serialize();

        } catch (Exception exception) {
            throw new IllegalStateException("Failed to generate JWT", exception);
        }
    }

    public UUID extractUserId(String token) {
        try {
            SignedJWT jwt = SignedJWT.parse(token);

            boolean verified = jwt.verify(
                    new MACVerifier(secretKey.getEncoded()));

            if (!verified) {
                throw new IllegalArgumentException("Invalid JWT signature");
            }

            JWTClaimsSet claims = jwt.getJWTClaimsSet();

            if (claims.getExpirationTime() == null ||
                    !claims.getExpirationTime().toInstant().isAfter(Instant.now())) {
                throw new IllegalArgumentException("JWT has expired");
            }

            return UUID.fromString(claims.getSubject());

        } catch (Exception exception) {
            throw new IllegalArgumentException("Invalid JWT token", exception);
        }
    }
}