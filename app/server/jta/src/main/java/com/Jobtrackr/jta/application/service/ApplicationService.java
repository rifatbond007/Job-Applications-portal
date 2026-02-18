package com.Jobtrackr.jta.application.service;

import com.Jobtrackr.jta.Job.entity.Job;
import com.Jobtrackr.jta.Job.entity.JobStatus;
import com.Jobtrackr.jta.Job.repository.JobRepo;
import com.Jobtrackr.jta.application.dto.ApplicationResponse;
import com.Jobtrackr.jta.application.dto.CandidateApplicationResponse;
import com.Jobtrackr.jta.application.entity.Application;
import com.Jobtrackr.jta.application.entity.ApplicationStatus;
import com.Jobtrackr.jta.application.repository.ApplicationRepository;
import com.Jobtrackr.jta.exception.BadRequestException;
import com.Jobtrackr.jta.exception.NotFoundException;
import com.Jobtrackr.jta.exception.UnauthorizedActionException;
import com.Jobtrackr.jta.user.entity.Role;
import com.Jobtrackr.jta.user.entity.User;
import com.Jobtrackr.jta.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepo jobRepository;
    private final UserRepository userRepository;

    public ApplicationService(ApplicationRepository applicationRepository,
                              JobRepo jobRepository,
                              UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }


public void apply(UUID jobId) {

    // 1️⃣ Extract authenticated user
    Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();

    String email = authentication.getName();




    User candidate = userRepository.findByEmail(email)
            .orElseThrow(() -> new NotFoundException("User not found"));

    // 2️⃣ Ensure role is CANDIDATE
    if (candidate.getRole() != Role.CANDIDATE) {
        throw new UnauthorizedActionException("Only candidates can apply");
    }

    // 3️⃣ Fetch job
    Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new NotFoundException("Job not found"));

    // 4️⃣ Check job is open
    if (job.getStatus() != JobStatus.OPEN) {
        throw new BadRequestException("Job is not open");
    }

    // 5️⃣ Prevent duplicate
    boolean alreadyApplied =
            applicationRepository.existsByJobIdAndCandidateId(
                    jobId,
                    candidate.getId()
            );

    if (alreadyApplied) {
        throw new BadRequestException("Already applied to this job");
    }

    // 6️⃣ Save application
    Application application = new Application();
    application.setJob(job);
    application.setCandidate(candidate);

    applicationRepository.save(application);
}

    public List<ApplicationResponse> getApplicationsForJob(UUID jobId,
                                                           UUID recruiterId) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new NotFoundException("Job not found"));

        // Verify recruiter owns job
        if (!job.getRecruiter().getId().equals(recruiterId)) {
            throw new UnauthorizedActionException("Unauthorized access");
        }

        List<Application> applications =
                applicationRepository.findByJobId(jobId);

        return applications.stream()
                .map(app -> new ApplicationResponse(
                        app.getId(),
                        app.getCandidate().getId(),
                        app.getCandidate().getEmail(),
                        app.getStatus(),
                        app.getAppliedAt()
                ))
                .toList();
    }

public void updateStatus(UUID applicationId,
                         ApplicationStatus newStatus) {

    // 1️⃣ Extract authenticated user
    Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();

    String email = authentication.getName();

    User recruiter = userRepository.findByEmail(email)
            .orElseThrow(() -> new NotFoundException("User not found"));

    // 2️⃣ Ensure recruiter role
    if (recruiter.getRole() != Role.RECRUITER) {
        throw new UnauthorizedActionException("Only recruiters can update status");
    }

    // 3️⃣ Fetch application
    Application application = applicationRepository.findById(applicationId)
            .orElseThrow(() -> new NotFoundException("Application not found"));

    Job job = application.getJob();

    // 4️⃣ Ensure recruiter owns the job
    if (!job.getRecruiter().getId().equals(recruiter.getId())) {
        throw new UnauthorizedActionException("Unauthorized action");
    }

    // 5️⃣ Optional: prevent update if job closed
    if (job.getStatus() != JobStatus.OPEN) {
        throw new BadRequestException("Cannot update application for closed job");
    }

    // 6️⃣ Update status
    application.setStatus(newStatus);

    applicationRepository.save(application);
}
    public Page<CandidateApplicationResponse> getMyApplications(Pageable pageable) {

        // 1️⃣ Extract user from JWT
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User candidate = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));

        if (candidate.getRole() != Role.CANDIDATE) {
            throw new UnauthorizedActionException("Only candidates can view their applications");
        }

        Page<Application> applications =
                applicationRepository.findByCandidateId(
                        candidate.getId(),
                        pageable
                );

        return applications.map(app ->
                new CandidateApplicationResponse(
                        app.getId(),
                        app.getJob().getTitle(),
                        app.getJob().getCompany().getName(),
                        app.getStatus(),
                        app.getAppliedAt()
                )
        );
    }


}
