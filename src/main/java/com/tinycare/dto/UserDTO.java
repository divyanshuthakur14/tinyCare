package com.tinycare.dto;

import com.tinycare.model.Role;
import com.tinycare.model.User;

public class UserDTO {

    private Long id;
    private String name;
    private String email;
    private Role role;

    // Constructor from User
    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole();
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
}
