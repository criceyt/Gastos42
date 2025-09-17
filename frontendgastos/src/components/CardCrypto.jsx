import React from "react";

const CardCrypto = ({ money = [] }) => {
  // Filtramos solo criptomonedas
  const cryptos = money.filter((m) => m.type === "CRYPTO");

  // Total general
  const totalGeneral = cryptos.reduce((sum, c) => sum + c.amount, 0);

  // Total por cada cripto
  const totalPorCripto = cryptos.reduce((acc, c) => {
    if (acc[c.name]) acc[c.name] += c.amount;
    else acc[c.name] = c.amount;
    return acc;
  }, {});

  // Filtramos solo criptos con amount > 0
  const cryptosVisibles = Object.entries(totalPorCripto).filter(
    ([, amount]) => amount > 0
  );

  return (
    <div className="card card-crypto p-3 mb-4 shadow-sm">
      <h5 className="card-title">Criptomonedas</h5>

      {/* Total general */}
      <p className="card-value">
        Total:{" "}
        {totalGeneral.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>

      {/* Total por cada cripto */}
      {cryptosVisibles.length > 0 ? (
        <ul className="list-unstyled">
          {cryptosVisibles.map(([name, amount]) => (
            <li key={name}>
              {name}:{" "}
              {amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes criptomonedas</p>
      )}
    </div>
  );
};

export default CardCrypto;
