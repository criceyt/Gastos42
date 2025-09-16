package com.irojas.demojwt.money;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    // Obtener monedas del usuario autenticado
    @GetMapping("/me")
    public List<Money> getMyMoney(Principal principal) {
        if(principal == null) {
            throw new RuntimeException("Usuario no autenticado");
        }
        String email = principal.getName();
        User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return moneyService.getUserMoney(user.getId());
    }

    // Endpoints adicionales (admin o pruebas)
    @GetMapping("/{userId}")
    public List<Money> getUserMoney(@PathVariable Integer userId) {
        return moneyService.getUserMoney(userId);
    }

    @PostMapping("/{userId}")
    public Money addMoney(@PathVariable Integer userId, @RequestBody Money money) {
        return moneyService.addMoney(userId, money);
    }

    @DeleteMapping("/{moneyId}")
    public void deleteMoney(@PathVariable Integer moneyId) {
        moneyService.deleteMoney(moneyId);
    }
}
