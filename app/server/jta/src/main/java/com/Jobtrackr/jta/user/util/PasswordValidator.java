package com.Jobtrackr.jta.user.util;

import com.Jobtrackr.jta.exception.BadRequestException;

import java.util.regex.Pattern;

public final class PasswordValidator {

    private static final int MIN_LENGTH = 8;
    private static final Pattern UPPER = Pattern.compile("[A-Z]");
    private static final Pattern LOWER = Pattern.compile("[a-z]");
    private static final Pattern DIGIT = Pattern.compile("[0-9]");
    private static final Pattern SPECIAL = Pattern.compile("[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?]");

    public static void validate(String password) {
        if (password == null || password.length() < MIN_LENGTH) {
            throw new BadRequestException("Password must be at least " + MIN_LENGTH + " characters");
        }
        if (!UPPER.matcher(password).find()) {
            throw new BadRequestException("Password must contain at least one uppercase letter");
        }
        if (!LOWER.matcher(password).find()) {
            throw new BadRequestException("Password must contain at least one lowercase letter");
        }
        if (!DIGIT.matcher(password).find()) {
            throw new BadRequestException("Password must contain at least one digit");
        }
        if (!SPECIAL.matcher(password).find()) {
            throw new BadRequestException("Password must contain at least one special character (!@#$%^&* etc.)");
        }
    }
}
