package com.Jobtrackr.jta.user.dto;

import com.Jobtrackr.jta.user.entity.Role;

import java.util.UUID;

public class UserResponse {

    private UUID id;
    private String name;
    private String email;
    private Role role;
    private boolean isActive;

    public UserResponse(UUID id, String name, String email, Role role, boolean isActive) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.isActive = isActive;
    }

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
    public boolean isActive() { return isActive; }
}
