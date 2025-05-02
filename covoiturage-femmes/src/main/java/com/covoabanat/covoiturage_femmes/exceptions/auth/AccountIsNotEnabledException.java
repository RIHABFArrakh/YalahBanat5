package com.covoabanat.covoiturage_femmes.exceptions.auth;

public class AccountIsNotEnabledException extends RuntimeException {
    public AccountIsNotEnabledException(String message) {
        super(message);
    }
}
