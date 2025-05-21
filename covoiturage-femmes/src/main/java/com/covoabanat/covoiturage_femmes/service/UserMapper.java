package com.covoabanat.covoiturage_femmes.service;

import com.covoabanat.covoiturage_femmes.dto.UserResponse;
import com.covoabanat.covoiturage_femmes.model.User;

public class UserMapper {

    public static UserResponse toDto(User user) {
        UserResponse dto = new UserResponse();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setMembershipDate(user.getMembershipDate());
        return dto;
    }
}
