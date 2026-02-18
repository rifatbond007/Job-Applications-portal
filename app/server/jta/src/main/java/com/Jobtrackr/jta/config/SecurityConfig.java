package com.Jobtrackr.jta.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        System.out.println("SECURITY CONFIG LOADED");


        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.GET, "/api/applications/jobs/**")
                        .hasAuthority("ROLE_RECRUITER")
                        .requestMatchers(HttpMethod.PATCH, "/api/applications/**")
                        .hasAuthority("ROLE_RECRUITER")
                        .requestMatchers(HttpMethod.POST, "/api/applications/jobs/*/apply")
                        .hasAuthority("ROLE_CANDIDATE")
                        .requestMatchers("/api/users/register", "/api/users/login")
                        .permitAll()
                        .requestMatchers(HttpMethod.PATCH, "/api/applications/*/status")
                        .hasAuthority("ROLE_RECRUITER")
                        .requestMatchers(HttpMethod.GET, "/api/applications/me/**")
                        .hasAuthority("ROLE_CANDIDATE")


                )
                .addFilterBefore(jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }
}
