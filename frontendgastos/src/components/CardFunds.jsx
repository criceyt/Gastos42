import React from "react";

const CardFunds = ({ money }) => {
  const funds = money.filter((m) => m.type === "FUND");

  // Total general
  const totalGeneral = funds.reduce((sum, f) => sum + f.amount, 0);

  // Total por cada fondo
  const totalPorFondo = funds.reduce((acc, f) => {
    if (acc[f.name]) {
      acc[f.name] += f.amount;
    } else {
      acc[f.name] = f.amount;
    }
    return acc;
  }, {});

  // Filtramos solo fondos con cantidad > 0
  const fondosVisibles = Object.entries(totalPorFondo).filter(
    ([, amount]) => amount > 0
  );

  return (
    <div className="card card-funds p-3 mb-4 shadow-sm">
      <h5 className="card-title">Fondos de Inversión</h5>

      {/* Total general */}
      <p className="card-value">
        Total:{" "}
        {totalGeneral.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{" "}
        €
      </p>

      {/* Total por cada fondo */}
      {fondosVisibles.length > 0 ? (
        <ul className="list-unstyled">
          {fondosVisibles.map(([name, amount]) => (
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
        <p>No tienes fondos</p>
      )}
    </div>
  );
};

export default CardFunds;
