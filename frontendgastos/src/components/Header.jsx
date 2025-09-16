import React from "react";

const Header = ({ money, user }) => {
  const firstname = user?.firstname || "Usuario"; // por si todavía no se carga
  const totalSaldo = money.reduce((acc, m) => acc + m.amount, 0);

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>FinApp Dashboard</h1>
      </div>
      <div className="header-right">
        <span className="header-saldo">Saldo: {totalSaldo}€</span>
        <button className="header-profile">
          <img src="/path/to/profile.jpg" alt="Perfil" />
          <span>{firstname}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
