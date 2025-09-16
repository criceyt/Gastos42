package com.irojas.demojwt.money;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.irojas.demojwt.User.User;
import com.irojas.demojwt.User.UserRepository;

@RestController
@RequestMapping("/money")
@CrossOrigin(origins = "http://localhost:5173")
public class MoneyController {

    private final MoneyService moneyService;
    private final UserRepository userRepository;

    @Autowired
    public MoneyController(MoneyService moneyService, UserRepository userRepository) {
        this.moneyService = moneyService;
        this.userRepository = userRepository;
    }

    // Endpoint para obtener el dinero del usuario logueado
    @GetMapping("/me")
    public List<Money> getMyMoney(Authentication authentication) {
        // El nombre del usuario en Authentication es el username/email que pusiste en el JWT
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return moneyService.getUserMoney(user.getId());
    }

    // Endpoint para obtener dinero de cualquier usuario (por admin o pruebas)
    @GetMapping("/{userId}")
    public List<Money> getUserMoney(@PathVariable Integer userId) {
        return moneyService.getUserMoney(userId);
    }

    // Añadir dinero a un usuario
    @PostMapping("/{userId}")
    public Money addMoney(@PathVariable Integer userId, @RequestBody Money money) {
        return moneyService.addMoney(userId, money);
    }

    // Eliminar un registro de dinero
    @DeleteMapping("/{moneyId}")
    public void deleteMoney(@PathVariable Integer moneyId) {
        moneyService.deleteMoney(moneyId);
    }
}
