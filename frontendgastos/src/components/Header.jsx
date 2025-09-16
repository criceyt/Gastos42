import React from "react";

const Header = () => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>FinApp Dashboard</h1>
      </div>
      <div className="header-right">
        <span className="header-saldo">Saldo: 5.000€</span>
        <button className="header-profile">
          <img src="/path/to/profile.jpg" alt="Perfil" />
          <span>Usuario</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
