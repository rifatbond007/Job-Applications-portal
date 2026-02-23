package com.Jobtrackr.jta.application.dto;

import com.Jobtrackr.jta.application.entity.ApplicationStatus;

public class UpdateApplicationStatusRequest {

    private ApplicationStatus status;

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
}
