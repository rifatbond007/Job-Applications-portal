package com.Jobtrackr.jta.company.controller;

import com.Jobtrackr.jta.company.dto.CompanyCreateRequest;
import com.Jobtrackr.jta.company.dto.CompanyResponse;
import com.Jobtrackr.jta.company.service.CompanyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping
    public CompanyResponse createCompany(@RequestBody CompanyCreateRequest request) {
        return companyService.createCompany(request);
    }

    @GetMapping
    public List<CompanyResponse> getAll() {
        return companyService.getAllCompanies();
    }
    @PostMapping("/{companyId}/recruiters/{userId}")
    public CompanyResponse assignRecruiter(
            @PathVariable UUID companyId,
            @PathVariable UUID userId) {
        return companyService.assignRecruiter(companyId, userId);
    }

    @PostMapping("/{companyId}/assign-me")
    public CompanyResponse assignMeToCompany(@PathVariable UUID companyId) {
        return companyService.assignCurrentUserToCompany(companyId);
    }
}
