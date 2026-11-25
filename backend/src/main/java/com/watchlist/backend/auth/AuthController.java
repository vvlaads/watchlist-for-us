package com.watchlist.backend.auth;

import java.time.Duration;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import org.springframework.security.core.Authentication;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

        private final AuthService authService;
        private final JwtService jwtService;

        public AuthController(
                        AuthService authService,
                        JwtService jwtService) {
                this.authService = authService;
                this.jwtService = jwtService;
        }

        @PostMapping("/register")
        public ResponseEntity<UserResponse> register(
                        @Valid @RequestBody RegisterRequest request) {
                UserResponse user = authService.register(request);

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(user);
        }

        @PostMapping("/login")
        public ResponseEntity<UserResponse> login(
                        @Valid @RequestBody LoginRequest request) {
                UserResponse user = authService.login(request);

                String token = jwtService.generateToken(user.id());

                ResponseCookie cookie = ResponseCookie.from("access_token", token)
                                .httpOnly(true)
                                .secure(false)
                                .sameSite("Lax")
                                .path("/")
                                .maxAge(Duration.ofDays(7))
                                .build();

                return ResponseEntity.ok()
                                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                                .body(user);
        }

        @PostMapping("/logout")
        public ResponseEntity<Void> logout() {
                ResponseCookie cookie = ResponseCookie.from("access_token", "")
                                .httpOnly(true)
                                .secure(false)
                                .sameSite("Lax")
                                .path("/")
                                .maxAge(0)
                                .build();

                return ResponseEntity.noContent()
                                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                                .build();
        }

        @GetMapping("/me")
        public ResponseEntity<UserResponse> getCurrentUser(
                        Authentication authentication) {
                UUID userId = (UUID) authentication.getPrincipal();

                return ResponseEntity.ok(authService.getCurrentUser(userId));
        }
}