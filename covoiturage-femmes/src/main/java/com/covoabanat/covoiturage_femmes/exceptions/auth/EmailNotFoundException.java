package com.covoabanat.covoiturage_femmes.exceptions.auth;

public class EmailNotFoundException extends RuntimeException {
    public EmailNotFoundException(String message) {
        super(message);
    }
}