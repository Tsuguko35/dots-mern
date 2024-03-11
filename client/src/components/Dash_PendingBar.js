import React, { useEffect, useState } from 'react';
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
import { getTableData } from '../utils';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dash_PendingBar({ userDetails }) {
    const [documents, setDocuments] = useState([])

    const getDocuments = async() => {
      const res = await getTableData({ documentType: 'All' })
      
      if(res?.status === 200){
        const documents = res?.data.documents
        const filteredDocs = documents.filter(document => 
          document.forward_To === userDetails.user_id || (document.forward_To.includes(userDetails.role) && !document.forward_To.includes(userDetails.user_id)) || (document.forward_To.includes('All') && !document.forward_To.includes(userDetails.user_id))
        )
        setDocuments(filteredDocs)
      }
      else{
        toast.error('Error fetching documents.')
      }
    }

    useEffect(() => {
      getDocuments()
    }, [])

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
        labels : labels,
        datasets: [
          {
            label: 'Approved',
            data: [documents.filter(documents => documents.status === 'Approved').length],
            backgroundColor: 'rgba(143, 185, 53, 0.5)',
          },
          {
            label: 'Pending',
            data: [documents.filter(documents => (documents.status !== 'Approved' && documents.status !== 'Rejected')).length],
            backgroundColor: 'rgba(230, 71, 71, 0.5)',
          },
          {
            label: 'Rejected',
            data: [documents.filter(documents => documents.status === 'Rejected').length],
            backgroundColor: 'rgba(224, 156, 59, 0.5)',
          },
        ],
      };

    return <Bar options={options} data={data}/>
}

export default Dash_PendingBar