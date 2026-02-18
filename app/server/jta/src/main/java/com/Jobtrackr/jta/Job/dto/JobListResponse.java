package com.Jobtrackr.jta.Job.dto;

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
    private LocalDateTime createdAt;

    public JobListResponse(UUID id,
                           String title,
                           String location,
                           Double salary,
                           String companyName,
                           LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.salary = salary;
        this.companyName = companyName;
        this.createdAt = createdAt;
    }

    // getters
}

