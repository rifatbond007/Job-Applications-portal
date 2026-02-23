package com.Jobtrackr.jta.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

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
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/register", "/api/users/login",
                                "/api/users/forgot-password", "/api/users/reset-password",
                                "/api/users/request-email-verification", "/api/users/verify-email")
                        .permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/jobs")
                        .permitAll()
                        .requestMatchers(
                                "/swagger-ui.html",
                                "/swagger-ui/**",
                                "/v3/api-docs/**"
                        ).permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/users/me")
                        .authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/users")
                        .hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/jobs/recruiter")
                        .hasAuthority("ROLE_RECRUITER")
                        .requestMatchers(HttpMethod.GET, "/api/jobs/all")
                        .hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/jobs")
                        .hasAuthority("ROLE_RECRUITER")
                        .requestMatchers(HttpMethod.GET, "/api/applications/jobs/**")
                        .hasAuthority("ROLE_RECRUITER")
                        .requestMatchers(HttpMethod.PATCH, "/api/applications/**")
                        .hasAuthority("ROLE_RECRUITER")
                        .requestMatchers(HttpMethod.POST, "/api/applications/jobs/*/apply")
                        .hasAuthority("ROLE_CANDIDATE")
                        .requestMatchers(HttpMethod.PATCH, "/api/applications/*/status")
                        .hasAuthority("ROLE_RECRUITER")
                        .requestMatchers(HttpMethod.GET, "/api/applications/me/**")
                        .hasAuthority("ROLE_CANDIDATE")
                        .requestMatchers(HttpMethod.PATCH, "/api/jobs/*/close")
                        .hasAuthority("ROLE_RECRUITER")
                        .requestMatchers(HttpMethod.POST, "/api/companies")
                        .hasAuthority("ROLE_RECRUITER")
                        .requestMatchers(HttpMethod.POST, "/api/companies/*/assign-me")
                        .hasAuthority("ROLE_RECRUITER")
                        .requestMatchers(HttpMethod.GET, "/api/companies")
                        .authenticated()
                        .anyRequest()
                        .authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "https://applications-portal.netlify.app"
        ));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
