package com.irojas.demojwt.money;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.irojas.demojwt.User.User;
import com.irojas.demojwt.User.UserRepository;

@Service
public class MoneyService {

    private final MoneyRepository moneyRepository;
    private final UserRepository userRepository;  // <--- añadir

    @Autowired
    public MoneyService(MoneyRepository moneyRepository, UserRepository userRepository) {
        this.moneyRepository = moneyRepository;
        this.userRepository = userRepository;   // <--- asignar
    }

    // Obtener todas las monedas de un usuario
    public List<Money> getUserMoney(Integer userId) {
        return moneyRepository.findByUserIdOrderByCreatedAtAsc(userId);
    }

    // Añadir o retirar dinero
public Money addMoney(Integer userId, String name, double amount, MoneyType type) {
    User user = userRepository.findById(userId)
                 .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    Money money = Money.builder()
                       .user(user)
                       .name(name)
                       .amount(amount)
                       .type(type)
                       .build();

    return moneyRepository.save(money);
}
public Money addOrUpdateMoney(Integer userId, String name, double delta, MoneyType type) {
    User user = userRepository.findById(userId)
                 .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    Money money = moneyRepository.findFirstByUserIdAndName(userId, name)
                 .orElse(Money.builder()
                             .user(user)
                             .name(name)
                             .amount(0.0)
                             .type(type)
                             .build());

    money.setAmount(money.getAmount() + delta);

    return moneyRepository.save(money);
}

public Map<String, Double> getTotals(Integer userId) {
    double liquid = getTotalByType(userId, MoneyType.LIQUID);
    double crypto = getTotalByType(userId, MoneyType.CRYPTO);
    double fund   = getTotalByType(userId, MoneyType.FUND);

    Map<String, Double> totals = new HashMap<>();
    totals.put("liquid", liquid);
    totals.put("crypto", crypto);
    totals.put("fund", fund);

    return totals;
}

private double getTotalByType(Integer userId, MoneyType type) {
    return moneyRepository.findByUserIdAndType(userId, type)
                          .stream()
                          .mapToDouble(Money::getAmount)
                          .sum();
}



    // Borrar moneda por ID
    public void deleteMoney(Integer moneyId) {
        moneyRepository.deleteById(moneyId);
    }
}
