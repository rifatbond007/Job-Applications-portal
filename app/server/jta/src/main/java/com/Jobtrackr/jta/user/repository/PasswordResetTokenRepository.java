package com.Jobtrackr.jta.user.repository;

import com.Jobtrackr.jta.user.entity.PasswordResetToken;
import com.Jobtrackr.jta.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, UUID> {
    Optional<PasswordResetToken> findByTokenAndUsedFalse(String token);
    void deleteByUser(User user);
}
