package com.covoabanat.covoiturage_femmes.exceptions.email;

public class SendingEmailException extends RuntimeException {
    public SendingEmailException(String message) {
        super(message);
    }
}
