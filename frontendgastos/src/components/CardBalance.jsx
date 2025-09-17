import React from "react";

const CardBalance = ({ money = [] }) => {
  // Filtramos solo saldo líquido
  const liquido = money.filter((m) => m.type === "LIQUID");

  // Calculamos total general
  const totalGeneral = liquido.reduce((sum, m) => sum + m.amount, 0);

  // Calculamos total por cada nombre de moneda líquida
  const totalPorMoneda = liquido.reduce((acc, m) => {
    if (acc[m.name]) acc[m.name] += m.amount;
    else acc[m.name] = m.amount;
    return acc;
  }, {});

  // Filtramos solo monedas con amount > 0
  const monedasVisibles = Object.entries(totalPorMoneda).filter(
    ([, amount]) => amount > 0
  );

  return (
    <div className="card card-balance p-3 mb-4 shadow-sm">
      <h5 className="card-title balance-title">Saldo Líquido</h5>

      {/* Total general */}
      <p className="card-value">
        Total:{" "}
        {totalGeneral.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{" "}
        €
      </p>

      {/* Total por cada moneda */}
      {monedasVisibles.length > 0 ? (
        <ul className="list-unstyled">
          {monedasVisibles.map(([name, amount]) => (
            <li key={name}>
              {name}:{" "}
              {amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              €
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes saldo líquido</p>
      )}
    </div>
  );
};

export default CardBalance;
