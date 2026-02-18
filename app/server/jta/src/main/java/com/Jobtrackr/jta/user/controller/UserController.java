package com.Jobtrackr.jta.user.controller;

import com.Jobtrackr.jta.user.dto.LoginRequest;
import com.Jobtrackr.jta.user.dto.LoginResponse;
import com.Jobtrackr.jta.user.dto.UserResponse;
import com.Jobtrackr.jta.user.entity.Role;
import com.Jobtrackr.jta.user.entity.User;
import com.Jobtrackr.jta.user.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponse register(
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam Role role
    ) {
        return userService.registerUser(email, password, role);
    }

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable UUID id) {
        return userService.getUserById(id);
    }
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}
