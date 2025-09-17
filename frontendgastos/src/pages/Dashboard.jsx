import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CardBalance from "../components/CardBalance";
import CardCrypto from "../components/CardCrypto";
import CardFunds from "../components/CardFunds";
import CardCharts from "../components/CardCharts";
import "./Dashboard.css";

const Dashboard = () => {
  const [money, setMoney] = useState([]);
  const [user, setUser] = useState(null);
  const [totals, setTotals] = useState({ liquid: 0, crypto: 0, fund: 0 });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Traer monedas (histórico)
        const moneyRes = await axios.get("http://localhost:8081/money/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMoney(moneyRes.data);

        // Traer info usuario
        const userRes = await axios.get("http://localhost:8081/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        // Traer totales
        const totalsRes = await axios.get("http://localhost:8081/money/totals/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotals(totalsRes.data);
      } catch (err) {
        console.error("AXIOS ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  if (loading) {
    return <p className="text-center mt-5">Cargando dashboard...</p>;
  }

  return (
    <div className="dashboard-container d-flex">
      <Sidebar />
      <div className="dashboard-main flex-fill">
        <Header money={money} user={user} />
        <div className="dashboard-content">
          <div className="cards-row">
            {/* Aquí pasamos la prop correctamente */}
            <CardBalance money={money} />
            <CardCrypto money={money} />
            <CardFunds money={money} />
          </div>
          <div className="charts">
            <CardCharts totals={totals} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
