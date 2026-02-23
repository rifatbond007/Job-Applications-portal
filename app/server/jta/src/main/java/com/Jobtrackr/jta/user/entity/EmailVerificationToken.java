package com.Jobtrackr.jta.user.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "email_verification_tokens")
public class EmailVerificationToken {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Instant expiresAt;

    private boolean used;

    public EmailVerificationToken() {}

    public EmailVerificationToken(String code, User user, Instant expiresAt) {
        this.code = code;
        this.user = user;
        this.expiresAt = expiresAt;
        this.used = false;
    }

    public UUID getId() { return id; }
    public String getCode() { return code; }
    public User getUser() { return user; }
    public Instant getExpiresAt() { return expiresAt; }
    public boolean isUsed() { return used; }
    public void setUsed(boolean used) { this.used = used; }
}
