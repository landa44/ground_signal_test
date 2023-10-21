import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function BarChart({data}) {

  const chartData = {
    labels: Object.keys(data).map( label => label.charAt(0).toUpperCase() + label.slice(1)),
    datasets: [
      {
        label: 'Average Store Traffic',
        data: Object.values(data),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Avg Store Traffic',
      },
    },
  };


  return <Bar options={options} data={chartData} />;
}
