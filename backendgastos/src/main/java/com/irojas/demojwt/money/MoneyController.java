package com.irojas.demojwt.money;

import java.security.Principal;
import java.util.List;
import java.util.Map;

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

    // Depósito
        @PostMapping("/deposit/{userId}")
        public Money deposit(@PathVariable Integer userId, @RequestBody Money money) {
            return moneyService.addOrUpdateMoney(userId, money.getName(), Math.abs(money.getAmount()), money.getType());
        }

        @PostMapping("/withdraw/{userId}")
        public Money withdraw(@PathVariable Integer userId, @RequestBody Money money) {
            return moneyService.addOrUpdateMoney(userId, money.getName(), -Math.abs(money.getAmount()), money.getType());
        }


    // Obtener monedas del usuario autenticado
    @GetMapping("/me")
    public List<Money> getMyMoney(Principal principal) {
        if (principal == null)
            throw new RuntimeException("Usuario no autenticado");

        String email = principal.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return moneyService.getUserMoney(user.getId());
    }

    // Endpoints adicionales
    @GetMapping("/{userId}")
    public List<Money> getUserMoney(@PathVariable Integer userId) {
        return moneyService.getUserMoney(userId);
    }

    @DeleteMapping("/{moneyId}")
    public void deleteMoney(@PathVariable Integer moneyId) {
        moneyService.deleteMoney(moneyId);
    }
    @GetMapping("/totals/{userId}")
    public Map<String, Double> getUserTotals(@PathVariable Integer userId) {
        return moneyService.getTotals(userId);
    }

    @GetMapping("/totals/me")
    public Map<String, Double> getMyTotals(Principal principal) {
        if (principal == null)
            throw new RuntimeException("Usuario no autenticado");

        String email = principal.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return moneyService.getTotals(user.getId());
    }

}
