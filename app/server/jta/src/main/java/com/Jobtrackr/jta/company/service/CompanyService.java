package com.Jobtrackr.jta.company.service;

import com.Jobtrackr.jta.company.dto.CompanyCreateRequest;
import com.Jobtrackr.jta.company.dto.CompanyResponse;
import com.Jobtrackr.jta.company.entity.Company;
import com.Jobtrackr.jta.company.repository.CompanyRepo;
import com.Jobtrackr.jta.exception.ConflictException;
import com.Jobtrackr.jta.exception.NotFoundException;
import com.Jobtrackr.jta.exception.UnauthorizedActionException;
import com.Jobtrackr.jta.user.entity.Role;
import com.Jobtrackr.jta.user.entity.User;
import com.Jobtrackr.jta.user.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CompanyService {

    private final CompanyRepo companyRepository;
    private final UserRepository userRepository;

    public CompanyService(CompanyRepo companyRepository, UserRepository userRepository) {
        this.companyRepository = companyRepository;
        this.userRepository=userRepository;
    }

    public CompanyResponse createCompany(CompanyCreateRequest request) {

        if (companyRepository.findByName(request.getName()).isPresent()) {
            throw new ConflictException("Company already exists");
        }

        Company company = new Company();
        company.setName(request.getName());
        company.setDescription(request.getDescription());
        company.setLocation(request.getLocation());

        Company saved = companyRepository.save(company);

        return new CompanyResponse(
                saved.getId(),
                saved.getName(),
                saved.getDescription(),
                saved.getLocation()
        );
    }

    public List<CompanyResponse> getAllCompanies() {

        return companyRepository.findAll()
                .stream()
                .map(c -> new CompanyResponse(
                        c.getId(),
                        c.getName(),
                        c.getDescription(),
                        c.getLocation()
                ))
                .toList();
    }
    @Transactional
    public CompanyResponse assignRecruiter(UUID companyId, UUID userId) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new NotFoundException("Company not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        if (user.getRole() != Role.RECRUITER) {
            throw new UnauthorizedActionException("User is not a recruiter");
        }

        user.setCompany(company);
        userRepository.save(user);

        return new CompanyResponse(
                company.getId(),
                company.getName(),
                company.getDescription(),
                company.getLocation()
        );
    }

    @Transactional
    public CompanyResponse assignCurrentUserToCompany(UUID companyId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new NotFoundException("User not found"));
        if (user.getRole() != Role.RECRUITER) {
            throw new UnauthorizedActionException("Only recruiters can be assigned to a company");
        }
        return assignRecruiter(companyId, user.getId());
    }
}