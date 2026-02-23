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

    @PostMapping
    public JobResponse createJob(@RequestBody JobCreateRequest request) {
        return jobService.createJob(request);
    }

    @GetMapping("/recruiter")
    public ResponseEntity<Page<JobListResponse>> getMyJobs(
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC)
            Pageable pageable) {
        return ResponseEntity.ok(jobService.getJobsByRecruiter(pageable));
    }

    @GetMapping("/all")
    public ResponseEntity<Page<JobListResponse>> getAllJobs(
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC)
            Pageable pageable) {
        return ResponseEntity.ok(jobService.getAllJobsAdmin(pageable));
    }

    @GetMapping
    public ResponseEntity<Page<JobListResponse>> getOpenJobs(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC)
            Pageable pageable) {

        return ResponseEntity.ok(jobService.getOpenJobs(pageable));
    }
    @PatchMapping("/{jobId}/close")
    public ResponseEntity<String> closeJob(@PathVariable UUID jobId) {

        jobService.closeJob(jobId);

        return ResponseEntity.ok("Job closed successfully");
    }


}