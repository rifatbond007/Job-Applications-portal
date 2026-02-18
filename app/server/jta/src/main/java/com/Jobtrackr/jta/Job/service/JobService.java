package com.Jobtrackr.jta.Job.service;


import com.Jobtrackr.jta.Job.dto.JobCreateRequest;
import com.Jobtrackr.jta.Job.dto.JobListResponse;
import com.Jobtrackr.jta.Job.dto.JobResponse;
import com.Jobtrackr.jta.Job.entity.Job;
import com.Jobtrackr.jta.Job.entity.JobStatus;
import com.Jobtrackr.jta.Job.repository.JobRepo;
import com.Jobtrackr.jta.exception.NotFoundException;
import com.Jobtrackr.jta.exception.UnauthorizedActionException;
import com.Jobtrackr.jta.user.entity.Role;
import com.Jobtrackr.jta.user.entity.User;
import com.Jobtrackr.jta.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

        public JobResponse createJob(UUID recruiterId,
                                     JobCreateRequest request) {

            User recruiter = userRepository.findById(recruiterId)
                    .orElseThrow(() -> new NotFoundException("Recruiter not found"));

            if (recruiter.getRole() != Role.RECRUITER) {
                throw new UnauthorizedActionException("User is not a recruiter");
            }

            if (recruiter.getCompany() == null) {
                throw new UnauthorizedActionException("Recruiter not assigned to company");
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


}
