package com.Jobtrackr.jta.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("FILTER RUNNING FOR: " + request.getRequestURI());

        String header = request.getHeader("Authorization");


        if (header != null && header.startsWith("Bearer ")) {

            String token = header.substring(7);

            try {

                String email = jwtUtil.validateToken(token);
                String role = jwtUtil.extractRole(token);

                System.out.println("ROLE FROM TOKEN: " + role);

                // Only set authentication if not already set
                if (SecurityContextHolder.getContext().getAuthentication() == null) {

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    email,
                                    null,
                                    List.of(new SimpleGrantedAuthority("ROLE_" + role))
                            );

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    System.out.println("Authorities: " +
                            SecurityContextHolder.getContext()
                                    .getAuthentication()
                                    .getAuthorities());
                }

            } catch (Exception e) {
                System.out.println("JWT ERROR: " + e.getMessage());
            }
        }


        filterChain.doFilter(request, response);
    }
}