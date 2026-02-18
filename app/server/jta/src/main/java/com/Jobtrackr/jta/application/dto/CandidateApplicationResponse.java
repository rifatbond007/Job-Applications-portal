package com.Jobtrackr.jta.application.dto;

import com.Jobtrackr.jta.application.entity.ApplicationStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public class CandidateApplicationResponse {

    private UUID applicationId;
    private String jobTitle;
    private String companyName;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;

    public CandidateApplicationResponse(UUID applicationId,
                                        String jobTitle,
                                        String companyName,
                                        ApplicationStatus status,
                                        LocalDateTime appliedAt) {
        this.applicationId = applicationId;
        this.jobTitle = jobTitle;
        this.companyName = companyName;
        this.status = status;
        this.appliedAt = appliedAt;
    }

    public UUID getApplicationId() { return applicationId; }
    public String getJobTitle() { return jobTitle; }
    public String getCompanyName() { return companyName; }
    public ApplicationStatus getStatus() { return status; }
    public LocalDateTime getAppliedAt() { return appliedAt; }
}

