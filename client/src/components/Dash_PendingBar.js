import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dash_PendingBar() {
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Requests Documents Status',
          },
        },
    };

    const labels = ['Documents Status'];

    const data = {
        labels,
        datasets: [
          {
            label: 'Approved',
            data: labels.map(() => Math.floor(Math.random() * 100) + 1),
            backgroundColor: 'rgba(143, 185, 53, 0.7)',
          },
          {
            label: 'Pending',
            data: labels.map(() => Math.floor(Math.random() * 100) + 1),
            backgroundColor: 'rgba(230, 71, 71, 0.7)',
          },
          {
            label: 'Rejected',
            data: labels.map(() => Math.floor(Math.random() * 100) + 1),
            backgroundColor: 'rgba(224, 156, 59, 0.7)',
          },
        ],
      };

    return <Bar options={options} data={data}/>
}

export default Dash_PendingBar