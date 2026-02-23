package com.Jobtrackr.jta.application.dto;

import com.Jobtrackr.jta.application.entity.ApplicationStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public class ApplicationResponse {

    private UUID applicationId;
    private UUID candidateId;
    private String candidateEmail;
    private String candidateName;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;

    public ApplicationResponse(UUID applicationId,
                               UUID candidateId,
                               String candidateEmail,
                               String candidateName,
                               ApplicationStatus status,
                               LocalDateTime appliedAt) {
        this.applicationId = applicationId;
        this.candidateId = candidateId;
        this.candidateEmail = candidateEmail;
        this.candidateName = candidateName;
        this.status = status;
        this.appliedAt = appliedAt;
    }

    public UUID getApplicationId() { return applicationId; }
    public UUID getCandidateId() { return candidateId; }
    public String getCandidateEmail() { return candidateEmail; }
    public String getCandidateName() { return candidateName; }
    public ApplicationStatus getStatus() { return status; }
    public LocalDateTime getAppliedAt() { return appliedAt; }
}

