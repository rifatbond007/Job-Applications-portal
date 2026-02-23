package com.Jobtrackr.jta.user.repository;

import com.Jobtrackr.jta.user.entity.EmailVerificationToken;
import com.Jobtrackr.jta.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EmailVerificationTokenRepository extends JpaRepository<EmailVerificationToken, UUID> {
    Optional<EmailVerificationToken> findByUserAndCodeAndUsedFalse(User user, String code);
    void deleteByUser(User user);
}
