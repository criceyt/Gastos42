import React from "react";

const CardFunds = ({ money }) => {
  // Filtramos solo fondos de inversión
  const funds = money.filter((m) => m.type === "FUND");

  const total = funds.reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="card card-funds p-3 mb-4 shadow-sm">
      <h5 className="card-title">Fondos de Inversión</h5>
      <p>Total: {total.toLocaleString()} €</p>
      {funds.length > 0 ? (
        <ul>
          {funds.map((f) => (
            <li key={f.id}>
              {f.name}: {f.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes fondos</p>
      )}
    </div>
  );
};

export default CardFunds;
