package com.Jobtrackr.jta.Job.dto;

import com.Jobtrackr.jta.Job.entity.JobStatus;
import com.Jobtrackr.jta.Job.entity.JobType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter

@AllArgsConstructor
public class JobResponse {
    private UUID id;
    private String title;
    private String description;
    private String location;
    private Double salary;
    private JobType type;
    private JobStatus status;
    private String companyName;

}
