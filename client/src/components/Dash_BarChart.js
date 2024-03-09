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

function Dash_BarChart() {
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Office/Departments',
          },
        },
    };

    const labels = ['7 Office/Departments with the most documents'];

    const data = {
        labels,
        datasets: [
          {
            label: 'Office 1',
            data: labels.map(() => Math.floor(Math.random() * 100) + 1),
            backgroundColor: ['rgba(255, 96, 0, 0.5)'],
          },
          {
            label: 'Office 2',
            data: labels.map(() => Math.floor(Math.random() * 100) + 1),
            backgroundColor: ['rgba(39, 33, 33, 0.5)'],
          },
          {
            label: 'Office 3',
            data: labels.map(() => Math.floor(Math.random() * 100) + 1),
            backgroundColor: ['rgba(255, 165, 89, 0.5)'],
          },
          {
            label: 'Office 4',
            data: labels.map(() => Math.floor(Math.random() * 100) + 1),
            backgroundColor: ['rgba(97, 103, 122, 0.5)'],
          },
          {
            label: 'Office 5',
            data: labels.map(() => Math.floor(Math.random() * 100) + 1),
            backgroundColor: ['rgba(242, 140, 40, 0.5)'],
          },
          {
            label: 'Office 6',
            data: labels.map(() => Math.floor(Math.random() * 100) + 1),
            backgroundColor: ['rgba(52, 52, 52, 0.5)'],
          },
          {
            label: 'Office 7',
            data: labels.map(() => Math.floor(Math.random() * 100) + 1),
            backgroundColor: ['rgba(230, 179, 30, 0.5)'],
          },
        ],
      };

    return <Bar options={options} data={data}/>
}

export default Dash_BarChart