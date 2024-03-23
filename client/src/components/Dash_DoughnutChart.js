import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import { getTableData } from '../utils';
import toast from 'react-hot-toast';

ChartJS.register(ArcElement, Tooltip, Legend);


const Dash_DoughnutChart = ({documents}) => {
  const [documentTypeCounts, setDocumentTypeCounts] = useState([])

    useEffect(() => {
      if(documents){
        // Function to calculate document type counts
        const calculateDocumentTypeCounts = () => {
          const typeCountsMap = new Map();

          // Count document types
          documents.forEach(doc => {
              const type = doc.document_Type;
              if (type) {
                  if (typeCountsMap.has(type)) {
                      typeCountsMap.set(type, typeCountsMap.get(type) + 1);
                  } else {
                      typeCountsMap.set(type, 1);
                  }
              }
          });

          // Sort document type counts in descending order
          const sortedTypeCounts = Array.from(typeCountsMap.entries())
              .sort((a, b) => b[1] - a[1]);

          // Select top 7 most frequent document types
          const top7TypeCounts = sortedTypeCounts.slice(0, 7);
          setDocumentTypeCounts(top7TypeCounts);
        }

        calculateDocumentTypeCounts();
      }
      
    }, [documents])

    


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
      'rgba(255, 96, 0, 0.2)', 
      'rgba(255, 165, 89, 0.2)', 
      'rgba(97, 103, 122, 0.2)', 
      'rgba(52, 52, 52, 0.2)',
      'rgba(242, 140, 40, 0.2)',
      'rgba(39, 33, 33, 0.2)',
      'rgba(54, 51, 51, 0.2)',
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
        labels: documentTypeCounts.map(([type, count]) => (type)),
        datasets: [
          {
            label: 'Number of Documents',
            data: documentTypeCounts.map(([type, count]) => (count)),
            backgroundColor: dataColors.color,
            borderColor: dataColors.border, 
            borderWidth: 1,
          },
        ],
    };
    return <Doughnut data={data} options={options}/>
};

export default Dash_DoughnutChart;
