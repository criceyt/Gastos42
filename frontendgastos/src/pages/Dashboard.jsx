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
  const token = localStorage.getItem("token");
  console.log("TOKEN:", token);


useEffect(() => {
  axios
    .get("http://localhost:8081/money/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("RESPONSE MONEY:", res.data);
      setMoney(res.data);
    })
    .catch((err) => console.error("AXIOS ERROR:", err));
}, [token]);


  return (
    <div className="dashboard-container d-flex">
      <Sidebar />
      <div className="dashboard-main flex-fill">
        <Header />
        <div className="dashboard-content">
          {/* Fila de cards */}
          <div className="cards-row">
            <CardBalance money={money} />
            <CardCrypto money={money} />
            <CardFunds money={money} />
          </div>

          {/* Fila de gráficos */}
          <div className="charts">
            <CardCharts money={money} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
