package com.Jobtrackr.jta.application.controller;

import com.Jobtrackr.jta.application.dto.ApplicationResponse;
import com.Jobtrackr.jta.application.dto.CandidateApplicationResponse;
import com.Jobtrackr.jta.application.dto.UpdateApplicationStatusRequest;
import com.Jobtrackr.jta.application.service.ApplicationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

@PostMapping("/jobs/{jobId}/apply")
public ResponseEntity<String> apply(@PathVariable UUID jobId) {

    applicationService.apply(jobId);

    return ResponseEntity.ok("Application submitted successfully");
}

    @GetMapping("/jobs/{jobId}/applications/{recruiterId}")
    public ResponseEntity<List<ApplicationResponse>> getApplications(
            @PathVariable UUID jobId,
            @PathVariable UUID recruiterId) {

        return ResponseEntity.ok(
                applicationService.getApplicationsForJob(jobId, recruiterId)
        );
    }


        @PatchMapping("/{applicationId}/status")
        public ResponseEntity<String> updateStatus(
                @PathVariable UUID applicationId,
                @RequestBody UpdateApplicationStatusRequest request) {

            applicationService.updateStatus(
                    applicationId,
                    request.getStatus()
            );

            return ResponseEntity.ok("Application status updated");
        }
    @GetMapping("/me/applications")
    public ResponseEntity<Page<CandidateApplicationResponse>> getMyApplications(
            @PageableDefault(size = 10, sort = "appliedAt", direction = Sort.Direction.DESC)
            Pageable pageable) {

        return ResponseEntity.ok(
                applicationService.getMyApplications(pageable)
        );
    }


}





