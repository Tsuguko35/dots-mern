import React, { useEffect, useState } from "react";
import "../../styles/monitoring.css";
import { MonitoringTable, PageHeader } from "../../components";
import { useParams } from "react-router-dom";
import { getAllUsers, getTableData, getTrackers } from "../../utils";
import toast from "react-hot-toast";

function Monitoring() {
  const { monitoringType } = useParams();
  const [documents, setDocuments] = useState([]);
  const [documentsToFilter, setDocumentsToFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trackers, setTrackers] = useState([]);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    searchFilter: "",
    docuNameFilter: "",
    docuTypeFilter: "",
    docuReceivedBy: "",
    officeDeptFilter: "",
    dateReceivedFilter: "",
    statusFilter: "",
  });

  //Get table data
  const getTableDocuments = async () => {
    setIsLoading(true);
    const res = await getTableData({ documentType: monitoringType });

    if (res?.status === 200) {
      if (res.data?.hasData === true) {
        setDocumentsToFilter(res.data?.documents);
      } else {
        setDocumentsToFilter([]);
      }
    } else toast.error("An error occured while fetching data.");
    setIsLoading(false);
  };

  const getTrackerData = async () => {
    const trackerRes = await getTrackers();
    if (trackerRes?.status === 200) {
      if (trackerRes.data?.hasData === true) {
        const sortedTrackers = trackerRes.data.trackers.sort((a, b) => {
          // Convert date strings to Date objects for comparison
          const dateA = new Date(a.date_Created);
          const dateB = new Date(b.date_Created);

          // Compare dates
          return dateA - dateB; // Descending order
        });

        setTrackers(sortedTrackers);
      }
    } else {
      toast.error(trackerRes?.errorMessage);
    }
  };

  const getUserOptions = async () => {
    const res = await getAllUsers();
    if (res?.status === 200) {
      setUsers(res.data?.users);
    } else toast.error("An error occured while fetching data.");
  };

  useEffect(() => {
    if (documentsToFilter) {
      const filteredDocs = documentsToFilter
        .filter(
          (document) =>
            document.document_Name
              .toLowerCase()
              .includes(filters.searchFilter.toLowerCase()) ||
            document.description
              .toLowerCase()
              .includes(filters.searchFilter.toLowerCase())
        )
        .filter((document) =>
          document.document_Name
            .toLowerCase()
            .includes(filters.docuNameFilter.toLowerCase())
        )
        .filter((document) =>
          document.document_Type
            .toLowerCase()
            .includes(filters.docuTypeFilter.toLowerCase())
        )
        .filter((document) =>
          document.received_By
            .toLowerCase()
            .includes(filters.docuReceivedBy.toLowerCase())
        )
        .filter((document) =>
          document.office_Dept
            .toLowerCase()
            .includes(filters.officeDeptFilter.toLowerCase())
        )
        .filter((document) =>
          document.date_Received
            .toLowerCase()
            .includes(filters.dateReceivedFilter.toLowerCase())
        )
        .filter((document) =>
          document.status
            .toLowerCase()
            .includes(filters.statusFilter.toLowerCase())
        );

      const sortedFilteredDocs = filteredDocs.sort((a, b) => {
        if (a.date_Received !== b.date_Received) {
          return (
            new Date(b.date_Received + "T" + b.time_Received) -
            new Date(a.date_Received + "T" + a.time_Received)
          );
        } else {
          return new Date(b.time_Received) - new Date(a.time_Received);
        }
      });

      setDocuments(sortedFilteredDocs);
    } else {
      setDocuments(documentsToFilter);
    }

    setCurrentPage(1);
  }, [filters, documentsToFilter]);

  const refreshTrackers = () => {
    getTrackerData();
  };

  useEffect(() => {
    document.title = `${monitoringType} Monitoring`;
    setIsLoading(true);
    getTableDocuments();
    getUserOptions();
    getTrackerData();
  }, [monitoringType]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [isLastPage, setIslastPage] = useState(false);
  const itemsPerPage = 20;

  useEffect(() => {
    if (documents) {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      // Calculate total pages
      const totalPages = Math.ceil(documents.length / itemsPerPage);

      // Determine if on the last page
      setIslastPage(currentPage === totalPages);
      setCurrentItems(documents.slice(indexOfFirstItem, indexOfLastItem));
    }
  }, [currentPage, documents, filters]);

  // Change page
  const paginate = (action) => {
    if (action === "Next") {
      setCurrentPage((prev) => prev + 1);
    } else if (action === "Back") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <section id="Monitoring" className="Monitoring">
      <div className="wrapper">
        <PageHeader page={"Monitoring"} />
        <div className="Monitoring_Table_Container">
          <MonitoringTable
            documentType={`${monitoringType}`}
            isLoading={isLoading}
            documents={currentItems}
            refreshTableFunc={getTableDocuments}
            users={users}
            setFilter={setFilters}
            filters={filters}
            trackers={trackers}
            refreshTracker={refreshTrackers}
            paginate={paginate}
            currentPage={currentPage}
            isLastPage={isLastPage}
          />
        </div>
      </div>
    </section>
  );
}

export default Monitoring;
