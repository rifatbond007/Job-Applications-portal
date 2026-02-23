package com.Jobtrackr.jta.Job.dto;

import com.Jobtrackr.jta.Job.entity.JobStatus;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
public class JobListResponse {
    private UUID id;
    private String title;
    private String location;
    private Double salary;
    private String companyName;
    private JobStatus status;
    private LocalDateTime createdAt;

    public JobListResponse(UUID id, String title, String location, Double salary,
                           String companyName, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.salary = salary;
        this.companyName = companyName;
        this.status = null;
        this.createdAt = createdAt;
    }

    public JobListResponse(UUID id, String title, String location, Double salary,
                           String companyName, JobStatus status, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.salary = salary;
        this.companyName = companyName;
        this.status = status;
        this.createdAt = createdAt;
    }
}

