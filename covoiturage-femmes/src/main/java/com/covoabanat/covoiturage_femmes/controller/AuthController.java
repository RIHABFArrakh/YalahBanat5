package com.covoabanat.covoiturage_femmes.controller;

import com.covoabanat.covoiturage_femmes.dto.*;
import com.covoabanat.covoiturage_femmes.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {

        String token = authService.login(loginRequest);

        return ResponseEntity.ok(new ApiResponse(token, "Success", 200)); // 200 est le code HTTP de succès.
    }

    @PostMapping("/register-passager")
    public ResponseEntity<ApiResponse<String>>  registerPassager(@RequestBody PassagerRegisterRequest request) throws Exception {
        ApiResponse<String> response = authService.registerPassager(request);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/register-conductrice")
    public ResponseEntity<ApiResponse<String>>  registerConductrice(@RequestBody ConductriceRegisterRequest request) throws Exception {
        ApiResponse<String> response = authService.registerConductrice(request);
        return ResponseEntity.ok(response);

    }

    @GetMapping("/activate")
    public ResponseEntity<ApiResponse<String>> activateAccount(@RequestParam String token) {
        ApiResponse<String> response = authService.activateAccount(token);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        try {
            authService.forgotPassword(request.getEmail());
        } catch (Exception e) {
            throw new RuntimeException(e); // Exception pour interrompre l'exécution.
        }

        return ResponseEntity.ok(new ApiResponse<>("Email de réinitialisation envoyé !", HttpStatus.OK.value()));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok(new ApiResponse<>("Mot de passe réinitialisé avec succès !", HttpStatus.OK.value()));
    }

}
