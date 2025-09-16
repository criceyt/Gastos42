import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const CardCharts = ({ money }) => {

const liquid = money
  .filter(m => m.type?.toUpperCase() === "LIQUID")
  .reduce((sum, m) => sum + m.amount, 0);

const crypto = money
  .filter(m => m.type?.toUpperCase() === "CRYPTO")
  .reduce((sum, m) => sum + m.amount, 0);

const fund = money
  .filter(m => m.type?.toUpperCase() === "FUND")
  .reduce((sum, m) => sum + m.amount, 0);


  const doughnutData = {
    labels: ["Cripto", "Fondos", "Líquido"],
    datasets: [
      {
        label: "Distribución",
        data: [crypto, fund, liquid],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  // Crecimiento mensual (datos ficticios por ahora)
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo"];
  const monthlyGrowth = months.map((_, i) => {
    // Suma de todo tipo de money como ejemplo simple
    return money.reduce((sum, m) => sum + m.amount * (i + 1) / months.length, 0);
  });

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Crecimiento mensual",
        data: monthlyGrowth,
        backgroundColor: "#36A2EB",
      },
    ],
  };

  return (
    <div className="card card-charts p-3 mb-4 shadow-sm">
      <h5 className="card-title">Estadísticas</h5>
      <div className="charts d-flex justify-content-between">
        <div className="chart-doughnut" style={{ width: "45%" }}>
          <Doughnut data={doughnutData} />
        </div>
        <div className="chart-bar" style={{ width: "45%" }}>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default CardCharts;
