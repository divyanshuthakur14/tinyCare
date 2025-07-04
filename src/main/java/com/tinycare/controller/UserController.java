package com.tinycare.controller;

import com.tinycare.dto.LoginRequestDTO;
import com.tinycare.dto.LoginResponseDTO;
import com.tinycare.dto.UserDTO;
import com.tinycare.model.User;
import com.tinycare.model.UserUpdateDTO;
import com.tinycare.repository.UserRepository;
import com.tinycare.security.JwtUtil;
import com.tinycare.service.userService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private userService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping
    public User createUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Set default role if none provided
        if (user.getRole() == null) {
            user.setRole(com.tinycare.model.Role.USER);
        }

        return userRepo.save(user);
    }


    @GetMapping
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        if (!userRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        userRepo.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody @Valid UserUpdateDTO dto) {
        User updatedUser = userService.updateUser(id, dto);
        return ResponseEntity.ok(new UserDTO(updatedUser));
    }

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO loginDTO) {
        User user = userService.loginUser(loginDTO.getEmail(), loginDTO.getPassword());
        String token = jwtUtil.generateToken(user); // pass the whole User object
        System.out.println("Login attempt for email: " + loginDTO.getEmail());
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    // Accessible to USER and ADMIN
    @GetMapping("/user/dashboard")
    public String userDashboard() {
        return "Welcome to USER Dashboard";
    }

    // Accessible to ADMIN only
    @GetMapping("/admin/dashboard")
    public String adminDashboard() {
        return "Welcome to ADMIN Dashboard";
    }





}
