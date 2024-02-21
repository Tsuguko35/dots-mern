import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const Dash_DoughnutChart = () => {
    const shuffleColors = (color, border) => {
      // Fisher-Yates shuffle algorithm
      for (let i = color.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        // Check if the current and previous elements are the same
        while (color[j] === color[j - 1]) {
          j = Math.floor(Math.random() * (i + 1));
        }
        // Swap elements
        [color[i], color[j]] = [color[j], color[i]];
        [border[i], border[j]] = [border[j], border[i]];
      }
      return {color: color, border: border};
    }

    const colors = [
      'rgba(255, 96, 0, 0.4)', 
      'rgba(255, 165, 89, 0.4)', 
      'rgba(97, 103, 122, 0.4)', 
      'rgba(52, 52, 52, 0.4)',
      'rgba(242, 140, 40, 0.4)',
      'rgba(39, 33, 33, 0.4)',
      'rgba(54, 51, 51, 0.4)',
    ]

    const borders = [
      'rgba(255, 96, 0, 1)',
      'rgba(255, 165, 89, 1)',
      'rgba(97, 103, 122, 1)',
      'rgba(52, 52, 52, 1)',
      'rgba(242, 140, 40, 1)',
      'rgba(39, 33, 33, 1)',
      'rgba(54, 51, 51, 1)'
    ]

    const dataColors = shuffleColors(colors, borders)

    const options = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Top Documents Distribution',
        },
      },
    };

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Purple'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3, 10],
            backgroundColor: dataColors.color,
            borderColor: dataColors.border, 
            borderWidth: 1,
          },
        ],
    };

    return (
        <>
            <Doughnut data={data} options={options}/>
        </> 
    );
};

export default Dash_DoughnutChart;
