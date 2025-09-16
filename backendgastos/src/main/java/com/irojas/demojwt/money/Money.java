package com.irojas.demojwt.money;

import com.irojas.demojwt.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Money {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;       // Ej: "Euro", "BTC", "Vanguard Fund"

    @Column(nullable = false)
    private Double amount;     

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MoneyType type;    // LIQUID, CRYPTO, FUND

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;         // Usuario propietario del dinero
}
