package com.irojas.demojwt.User;


import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Obtener información del usuario autenticado
    @GetMapping("/me")
    public User getMe(Principal principal) {
        if (principal == null) {
            throw new RuntimeException("Usuario no autenticado");
        }
        String email = principal.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

 {
    
}
}