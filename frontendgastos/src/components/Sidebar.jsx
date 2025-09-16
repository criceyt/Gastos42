import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>FinApp</h2>
      <ul>
        <li><Link to="#">Gestión Finanzas</Link></li>
        <li><Link to="#">Historial Transacciones</Link></li>
        <li><Link to="#">Ajustes</Link></li>
        <li><Link to="#">IA Dudas</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
