import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const CardCharts = ({ totals }) => {
  const { liquid, crypto, fund } = totals;

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

  // 🚨 Por ahora el bar chart sigue siendo ficticio
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo"];
  const monthlyGrowth = months.map((_, i) => {
    // Aquí tendrías que conectar con un endpoint de "histórico"
    return (crypto + fund + liquid) * ((i + 1) / months.length);
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
