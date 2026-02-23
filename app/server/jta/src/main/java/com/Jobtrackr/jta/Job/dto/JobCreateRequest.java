package com.Jobtrackr.jta.Job.dto;

import com.Jobtrackr.jta.Job.entity.JobType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JobCreateRequest {

    private String title;
    private String description;
    private String location;
    private Double salary;
    private JobType type;




}
