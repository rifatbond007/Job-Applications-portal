package com.Jobtrackr.jta.application.dto;

import java.util.UUID;

public class ApplyRequest {
    private UUID jobId;

    public UUID getJobId() {
        return jobId;
    }

    public void setJobId(UUID jobId) {
        this.jobId = jobId;
    }
}

