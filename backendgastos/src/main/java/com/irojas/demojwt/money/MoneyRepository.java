package com.irojas.demojwt.money;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoneyRepository extends JpaRepository<Money, Integer> {
    List<Money> findByUserId(Integer userId);
    List<Money> findByUserIdAndType(Integer userId, MoneyType type);
}
