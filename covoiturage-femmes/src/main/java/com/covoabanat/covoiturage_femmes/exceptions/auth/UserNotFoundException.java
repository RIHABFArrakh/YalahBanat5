package com.covoabanat.covoiturage_femmes.exceptions.auth;

public class UserNotFoundException extends RuntimeException {
  public UserNotFoundException(String email) {
    super("Utilisateur non trouvé avec l'email : " + email);
  }
}
