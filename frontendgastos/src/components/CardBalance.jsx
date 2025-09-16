import React from "react";

const CardBalance = ({ money }) => {
  // Filtramos todos los movimientos de tipo LIQUID
  const liquido = money.filter((m) => m.type === "LIQUID");
  // Sumamos los importes
  const total = liquido.reduce((sum, m) => sum + m.amount, 0);

  return (
    <div className="card card-balance p-3 mb-4 shadow-sm">
      <h5 className="card-title balance-title">Saldo Líquido</h5>
      <p className="card-value balance-value">{total.toLocaleString()} €</p>
    </div>
  );
};

export default CardBalance;
