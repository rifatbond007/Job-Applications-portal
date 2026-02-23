package com.Jobtrackr.jta.user.controller;

import com.Jobtrackr.jta.user.dto.AuthUser;
import com.Jobtrackr.jta.user.dto.ChangePasswordRequest;
import com.Jobtrackr.jta.user.dto.ForgotPasswordRequest;
import com.Jobtrackr.jta.user.dto.LoginRequest;
import com.Jobtrackr.jta.user.dto.LoginResponse;
import com.Jobtrackr.jta.user.dto.RegisterRequest;
import com.Jobtrackr.jta.user.dto.RequestEmailVerificationRequest;
import com.Jobtrackr.jta.user.dto.ResetPasswordRequest;
import com.Jobtrackr.jta.user.dto.UpdateProfileRequest;
import com.Jobtrackr.jta.user.dto.UserResponse;
import com.Jobtrackr.jta.user.dto.VerifyEmailRequest;
import com.Jobtrackr.jta.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable UUID id) {
        return userService.getUserById(id);
    }
    @GetMapping("/me")
    public AuthUser getMe(Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) return null;
        return userService.getCurrentUser(auth.getName());
    }

    @PatchMapping("/me/profile")
    public AuthUser updateProfile(@RequestBody UpdateProfileRequest request, Authentication auth) {
        return userService.updateProfile(request);
    }

    @PatchMapping("/me/password")
    public ResponseEntity<Map<String, String>> changePassword(@RequestBody ChangePasswordRequest request) {
        userService.changePassword(request);
        return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        userService.forgotPassword(request);
        return ResponseEntity.ok(Map.of("message", "If an account exists with this email, you will receive a recovery link."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody ResetPasswordRequest request) {
        userService.resetPassword(request);
        return ResponseEntity.ok(Map.of("message", "Password has been reset. You can now sign in."));
    }

    @PostMapping("/request-email-verification")
    public ResponseEntity<Map<String, String>> requestEmailVerification(@RequestBody RequestEmailVerificationRequest request) {
        userService.requestEmailVerification(request);
        return ResponseEntity.ok(Map.of("message", "If an account exists with this email, a verification code has been sent."));
    }

    @PostMapping("/verify-email")
    public ResponseEntity<Map<String, String>> verifyEmail(@RequestBody VerifyEmailRequest request) {
        userService.verifyEmail(request);
        return ResponseEntity.ok(Map.of("message", "Email verified. You can now sign in."));
    }
}
