package com.Jobtrackr.jta.application.repository;

import com.Jobtrackr.jta.application.entity.Application;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ApplicationRepository
        extends JpaRepository<Application, UUID> {

    boolean existsByJobIdAndCandidateId(UUID jobId, UUID candidateId);

    List<Application> findByCandidateId(UUID candidateId);

    List<Application> findByJobId(UUID jobId);
    Page<Application> findByCandidateId(UUID candidateId, Pageable pageable);

}

