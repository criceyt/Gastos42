package com.irojas.demojwt.money;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.irojas.demojwt.User.User;
import com.irojas.demojwt.User.UserRepository;

@Service
public class MoneyService {

    private final MoneyRepository moneyRepository;
    private final UserRepository userRepository;
    
    @Autowired
    public MoneyService(MoneyRepository moneyRepository, UserRepository userRepository) {
        this.moneyRepository = moneyRepository;
        this.userRepository = userRepository;
    }

    public List<Money> getUserMoney(Integer userId) {
        return moneyRepository.findByUserId(userId);
    }

    public Money addMoney(Integer userId, Money money) {
        User user = userRepository.findById(userId).orElseThrow();
        money.setUser(user);
        return moneyRepository.save(money);
    }

    public void deleteMoney(Integer moneyId) {
        moneyRepository.deleteById(moneyId);
    }
    
}
