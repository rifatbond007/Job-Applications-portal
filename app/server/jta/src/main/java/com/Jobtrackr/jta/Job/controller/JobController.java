package com.Jobtrackr.jta.Job.controller;

import com.Jobtrackr.jta.Job.dto.JobCreateRequest;
import com.Jobtrackr.jta.Job.dto.JobListResponse;
import com.Jobtrackr.jta.Job.dto.JobResponse;
import com.Jobtrackr.jta.Job.service.JobService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping("/{recruiterId}")
    public JobResponse createJob(@PathVariable UUID recruiterId,
                                 @RequestBody JobCreateRequest request) {

        return jobService.createJob(recruiterId, request);
    }
    @GetMapping
    public ResponseEntity<Page<JobListResponse>> getOpenJobs(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC)
            Pageable pageable) {

        return ResponseEntity.ok(jobService.getOpenJobs(pageable));
    }

}