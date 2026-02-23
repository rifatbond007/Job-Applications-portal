package com.Jobtrackr.jta.user.dto;

import com.Jobtrackr.jta.user.entity.Role;

import java.util.UUID;

public class AuthUser {
    private UUID id;
    private String name;
    private String email;
    private Role role;
    private String location;

    public AuthUser(UUID id, String name, String email, Role role, String location) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.location = location;
    }

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
    public String getLocation() { return location; }
}
