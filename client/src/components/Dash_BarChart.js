import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { getTableData } from "../utils";
import toast from "react-hot-toast";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dash_BarChart({ documents }) {
  const [documentTypeCounts, setDocumentTypeCounts] = useState([]);

  useEffect(() => {
    if (documents) {
      // Function to calculate document type counts
      const calculateDocumentTypeCounts = () => {
        const typeCountsMap = new Map();

        // Count document types
        documents.forEach((doc) => {
          const type = doc.office_Dept;
          if (type) {
            if (typeCountsMap.has(type)) {
              typeCountsMap.set(type, typeCountsMap.get(type) + 1);
            } else {
              typeCountsMap.set(type, 1);
            }
          }
        });

        // Sort document type counts in descending order
        const sortedTypeCounts = Array.from(typeCountsMap.entries()).sort(
          (a, b) => b[1] - a[1]
        );

        // Select top 7 most frequent document types
        const top7TypeCounts = sortedTypeCounts.slice(0, 7);
        setDocumentTypeCounts(top7TypeCounts);
      };

      calculateDocumentTypeCounts();
    }
  }, [documents]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Office/Departments",
      },
    },
  };

  const labels = ["7 Office/Departments with the most documents"];

  const labelColors = [
    "rgba(255, 96, 0, 0.5)",
    "rgba(39, 33, 33, 0.5)",
    "rgba(255, 165, 89, 0.5)",
    "rgba(97, 103, 122, 0.5)",
    "rgba(242, 140, 40, 0.5)",
    "rgba(52, 52, 52, 0.5)",
    "rgba(230, 179, 30, 0.5)",
  ];

  const datasets = documentTypeCounts.map(([office, count], index) => ({
    label: office,
    data: [count], // Wrap count in an array
    backgroundColor: labelColors[index],
  }));

  const data = {
    labels,
    datasets: datasets,
  };

  if (documents) {
    return <Bar options={options} data={data} />;
  } else {
    return "No documents Found";
  }
}

export default Dash_BarChart;
