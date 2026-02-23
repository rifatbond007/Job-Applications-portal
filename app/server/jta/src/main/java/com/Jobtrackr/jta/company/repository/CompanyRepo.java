package com.Jobtrackr.jta.company.repository;

import com.Jobtrackr.jta.company.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CompanyRepo extends JpaRepository<Company, UUID> {
    Optional<Company> findByName(String name);
}
