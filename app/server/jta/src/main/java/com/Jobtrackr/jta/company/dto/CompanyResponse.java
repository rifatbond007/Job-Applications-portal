package com.Jobtrackr.jta.company.dto;

import lombok.Getter;
import lombok.AllArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@AllArgsConstructor
@Setter
public class CompanyResponse {

    private UUID id;
    private String name;
    private String description;
    private String location;
}