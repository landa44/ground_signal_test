import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const CHART_TITLE = "Average Store Traffic";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

export default function BarChart({ data }) {
  const chartData = {
    labels: Object.keys(data).map(
      (key) =>
        // Capitalizing the keys
        key.charAt(0).toUpperCase() + key.slice(1)
    ),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: CHART_TITLE,
      },
    },
  };

  return <Bar options={options} data={chartData} />;
}
