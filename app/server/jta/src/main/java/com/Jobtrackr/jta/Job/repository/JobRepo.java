package com.Jobtrackr.jta.Job.repository;

import com.Jobtrackr.jta.Job.entity.Job;
import com.Jobtrackr.jta.Job.entity.JobStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JobRepo extends JpaRepository<Job, UUID> {
    List<Job> findByStatus(JobStatus status);
    Page<Job> findByStatus(JobStatus status, Pageable pageable);

}