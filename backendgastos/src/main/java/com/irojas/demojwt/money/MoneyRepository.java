package com.irojas.demojwt.money;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoneyRepository extends JpaRepository<Money, Integer> {
    List<Money> findByUserId(Integer userId);
    List<Money> findByUserIdOrderByCreatedAtAsc(Integer userId);
    Optional<Money> findFirstByUserIdAndName(Integer userId, String name);
    List<Money> findByUserIdAndName(Integer userId, String name);
    List<Money> findByUserIdAndType(Integer userId, MoneyType type);


}
