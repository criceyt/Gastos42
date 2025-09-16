import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const CardCharts = () => {
  const doughnutData = {
    labels: ["Cripto", "Fondos", "Liquido"],
    datasets: [
      {
        label: "Distribución",
        data: [35, 45, 20],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const barData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Crecimiento mensual",
        data: [1000, 1200, 900, 1400, 1500],
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
