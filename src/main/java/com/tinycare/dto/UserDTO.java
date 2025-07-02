package com.tinycare.dto;

import com.tinycare.model.User;

public class UserDTO {

    private Long id;
    private String name;
    private String email;

    // Constructor from User
    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}
