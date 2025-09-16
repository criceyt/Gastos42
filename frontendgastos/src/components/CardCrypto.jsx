import React from "react";

const CardCrypto = ({ money }) => {
  // Filtramos solo criptomonedas
  const cryptos = money.filter((m) => m.type === "CRYPTO");

  return (
    <div className="card card-crypto p-3 mb-4 shadow-sm">
      <h5 className="card-title">Criptomonedas</h5>
      {cryptos.length > 0 ? (
        <ul>
          {cryptos.map((c) => (
            <li key={c.id}>
              {c.name}: {c.amount}
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
