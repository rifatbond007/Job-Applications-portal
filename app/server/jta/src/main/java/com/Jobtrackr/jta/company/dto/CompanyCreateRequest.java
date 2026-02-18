package com.Jobtrackr.jta.company.dto;
import lombok.Getter;
import lombok.AllArgsConstructor;
import lombok.Setter;


@Getter
@AllArgsConstructor
@Setter
public class CompanyCreateRequest {

        private String name;
        private String description;
        private String location;
}
