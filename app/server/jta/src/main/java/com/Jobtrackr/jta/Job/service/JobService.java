package com.Jobtrackr.jta.Job.service;


import com.Jobtrackr.jta.Job.dto.JobCreateRequest;
import com.Jobtrackr.jta.Job.dto.JobListResponse;
import com.Jobtrackr.jta.Job.dto.JobResponse;
import com.Jobtrackr.jta.Job.entity.Job;
import com.Jobtrackr.jta.Job.entity.JobStatus;
import com.Jobtrackr.jta.Job.repository.JobRepo;
import com.Jobtrackr.jta.exception.ConflictException;
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

import java.time.LocalDateTime;
import java.util.UUID;

@Service
    public class JobService {

        private final JobRepo jobRepository;
        private final UserRepository userRepository;

        public JobService(JobRepo jobRepository,
                          UserRepository userRepository) {
            this.jobRepository = jobRepository;
            this.userRepository = userRepository;
        }

        public JobResponse createJob(JobCreateRequest request) {
            Authentication authentication =
                    SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User recruiter = userRepository.findByEmail(email)
                    .orElseThrow(() -> new NotFoundException("User not found"));

            if (recruiter.getRole() != Role.RECRUITER) {
                throw new UnauthorizedActionException("User is not a recruiter");
            }

            if (recruiter.getCompany() == null) {
                throw new UnauthorizedActionException("Recruiter must be assigned to a company before posting jobs");
            }

            Job job = new Job();
            job.setTitle(request.getTitle());
            job.setDescription(request.getDescription());
            job.setLocation(request.getLocation());
            job.setSalary(request.getSalary());
            job.setType(request.getType());
            job.setStatus(JobStatus.OPEN);
            job.setCreatedAt(LocalDateTime.now());
            job.setCompany(recruiter.getCompany());
            job.setRecruiter(recruiter);

            Job saved = jobRepository.save(job);

            return new JobResponse(
                    saved.getId(),
                    saved.getTitle(),
                    saved.getDescription(),
                    saved.getLocation(),
                    saved.getSalary(),
                    saved.getType(),
                    saved.getStatus(),
                    saved.getCompany().getName()
            );
        }

        public Page<JobListResponse> getJobsByRecruiter(Pageable pageable) {
            Authentication authentication =
                    SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User recruiter = userRepository.findByEmail(email)
                    .orElseThrow(() -> new NotFoundException("User not found"));

            if (recruiter.getRole() != Role.RECRUITER) {
                throw new UnauthorizedActionException("Only recruiters can list their jobs");
            }

            return jobRepository.findByRecruiterId(recruiter.getId(), pageable)
                    .map(job -> new JobListResponse(
                            job.getId(),
                            job.getTitle(),
                            job.getLocation(),
                            job.getSalary(),
                            job.getCompany().getName(),
                            job.getStatus(),
                            job.getCreatedAt()
                    ));
        }

        public Page<JobListResponse> getAllJobsAdmin(Pageable pageable) {
            Authentication authentication =
                    SecurityContextHolder.getContext().getAuthentication();
            User user = userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new NotFoundException("User not found"));
            if (user.getRole() != Role.ADMIN) {
                throw new UnauthorizedActionException("Only admins can list all jobs");
            }
            return jobRepository.findAll(pageable)
                    .map(job -> new JobListResponse(
                            job.getId(),
                            job.getTitle(),
                            job.getLocation(),
                            job.getSalary(),
                            job.getCompany() != null ? job.getCompany().getName() : "",
                            job.getStatus(),
                            job.getCreatedAt()
                    ));
        }

    public Page<JobListResponse> getOpenJobs(Pageable pageable) {

        Page<Job> jobs = jobRepository.findByStatus(JobStatus.OPEN, pageable);

        return jobs.map(job ->
                new JobListResponse(
                        job.getId(),
                        job.getTitle(),
                        job.getLocation(),
                        job.getSalary(),
                        job.getCompany().getName(),
                        job.getCreatedAt()
                )
        );
    }
    public void closeJob(UUID jobId) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));

        if (recruiter.getRole() != Role.RECRUITER) {
            throw new UnauthorizedActionException("Only recruiters can close jobs");
        }

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new NotFoundException("Job not found"));

        if (!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new UnauthorizedActionException("You do not own this job");
        }

        if (job.getStatus() == JobStatus.CLOSED) {
            throw new ConflictException("Job already closed");
        }

        job.setStatus(JobStatus.CLOSED);

        jobRepository.save(job);
    }



}
