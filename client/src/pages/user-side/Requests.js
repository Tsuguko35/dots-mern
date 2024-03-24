import React, { useContext, useEffect, useState } from "react";
import { PageHeader, RequestTable } from "../../components";
import "../../styles/requests.css";
import { useParams } from "react-router-dom";
import { getTableData, getTrackers } from "../../utils";
import toast from "react-hot-toast";
import { NotificationContext } from "../../context/context";

function Requests() {
  const [documentsToFilter, setDocumentsToFilter] = useState([]);
  const [isTriggerNotification, setIsTriggerNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [trackers, setTrackers] = useState([]);
  const { user } = useContext(NotificationContext);
  const userDetails = user;
  const { requestType } = useParams();
  const [filters, setFilters] = useState({
    searchFilter: "",
    docuNameFilter: "",
    docuTypeFilter: "",
    docuReceivedBy: "",
    officeDeptFilter: "",
    dateReceivedFilter: "",
    statusFilter: "",
  });
  //Notifications
  const { notifications } = useContext(NotificationContext);

  //Get table data
  const getTableDocuments = async () => {
    if (!isTriggerNotification) setIsLoading(true);
    let res = null;

    if (requestType === "History") {
      res = await getTableData({ documentType: "All" });
    } else {
      res = await getTableData({ documentType: requestType });
    }

    if (res?.status === 200) {
      if (!isTriggerNotification) setIsLoading(false);
      setDocumentsToFilter(res.data?.documents);
    } else toast.error("An error occured while fetching data.");
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
        )
        .filter(
          (document) =>
            (requestType !== "History" &&
              (document.forward_To === userDetails.user_id ||
                (document.forward_To.includes(userDetails.role) &&
                  !document.forward_To.includes(userDetails.user_id)) ||
                (document.forward_To.includes("All") &&
                  !document.forward_To.includes(userDetails.user_id)))) ||
            (requestType === "History" &&
              (document.accepted_Rejected_By === userDetails.user_id ||
                document.created_By === userDetails.full_Name))
        );

      console.log(filteredDocs, userDetails.role);

      const sortedFilteredDocs = filteredDocs.sort((a, b) => {
        // Place urgent documents on top regardless of date
        if (a.urgent === 1 && b.urgent !== 1) {
          return -1;
        } else if (a.urgent !== 1 && b.urgent === 1) {
          return 1;
        } else {
          // Sort by date and time if urgency is the same
          if (a.date_Received !== b.date_Received) {
            return (
              new Date(b.date_Received + "T" + b.time_Received) -
              new Date(a.date_Received + "T" + a.time_Received)
            );
          } else {
            return new Date(b.time_Received) - new Date(a.time_Received);
          }
        }
      });

      setDocuments(sortedFilteredDocs);
    } else {
      setDocuments(documentsToFilter);
    }

    setCurrentPage(1);
  }, [filters, documentsToFilter]);

  useEffect(() => {
    document.title = `Requests`;
    setIsLoading(true);
    setIsTriggerNotification(false);
    getTableDocuments();
    getTrackerData();
  }, [requestType]);

  useEffect(() => {
    setIsTriggerNotification(true);
    getTableDocuments();
    getTrackerData();
  }, [notifications]);

  const refreshTrackers = () => {
    getTrackerData();
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [isLastPage, setIslastPage] = useState(false);
  const itemsPerPage = 20;

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Calculate total pages
    const totalPages = Math.ceil(documents.length / itemsPerPage);

    // Determine if on the last page
    setIslastPage(currentPage === totalPages);
    setCurrentItems(documents.slice(indexOfFirstItem, indexOfLastItem));
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
    <section id="Requests" className="Requests">
      <div className="wrapper">
        <PageHeader page={"Requests"} />
        <div className="Requests_Table_Container">
          <RequestTable
            documentType={requestType}
            documents={currentItems}
            setFilter={setFilters}
            filters={filters}
            getTableDcuments={getTableDocuments}
            userDetails={userDetails}
            isLoading={isLoading}
            trackers={trackers}
            refreshTracker={refreshTrackers}
            requestType={requestType}
            paginate={paginate}
            currentPage={currentPage}
            isLastPage={isLastPage}
          />
        </div>
      </div>
    </section>
  );
}

export default Requests;
