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
  const token = localStorage.getItem("token");

  useEffect(() => {
    // traer monedas
    axios
      .get("http://localhost:8081/money/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMoney(res.data))
      .catch((err) => console.error("AXIOS ERROR MONEY:", err));

    // traer info usuario
    axios
      .get("http://localhost:8081/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("AXIOS ERROR USER:", err));
  }, [token]);

  return (
    <div className="dashboard-container d-flex">
      <Sidebar />
      <div className="dashboard-main flex-fill">
        <Header money={money} user={user} />
        <div className="dashboard-content">
          <div className="cards-row">
            <CardBalance money={money} />
            <CardCrypto money={money} />
            <CardFunds money={money} />
          </div>
          <div className="charts">
            <CardCharts money={money} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
