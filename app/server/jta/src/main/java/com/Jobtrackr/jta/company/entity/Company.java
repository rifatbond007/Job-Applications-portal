package com.Jobtrackr.jta.company.entity;

import com.Jobtrackr.jta.user.entity.User;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "company")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false , unique = true)
    private String name ;
    private String description;
    private String location;
    @OneToMany(mappedBy = "company")
    private List<User> recruiter;

    private LocalDate createdAt;
    private LocalDate updatedAt;

}
