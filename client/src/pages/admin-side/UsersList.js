import React, { useEffect, useState } from "react";

import "../../styles/userslist.css";
import { getAllUsers } from "../../utils";
import toast from "react-hot-toast";
import { UsersListTable } from "../../components";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [usersToFilter, setUsersToFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "Approved",
    userSearch: "",
  });

  const getUsers = async () => {
    setIsLoading(true);
    const res = await getAllUsers();

    if (res?.status === 200) {
      setIsLoading(false);
      const usersList = res.data?.users;
      setUsersToFilter(usersList.filter((user) => user.role !== "Admin"));
    } else {
      toast.error("Failed fetching users");
    }
  };

  // prettier-ignore
  useEffect(() => {
    if (usersToFilter) {
      const filteredUsers = usersToFilter
        .filter((users) => {
          if (filters.status === "Pending") {
            return users.status === "Pending";
          } else if (filters.status === "Approved") {
            return users.status === "Active" || users.status === "Deactivated";
          } else if (filters.status === "Temporary") {
            return users.status === "Temporary";
          } else {
            return true; 
          }
        })
        .filter(
          (users) =>
            users.full_Name.toLowerCase().includes(filters.userSearch.toLowerCase()) ||
            users.email.toLowerCase().includes(filters.userSearch.toLowerCase())
        );

      setUsers(filteredUsers);
    }
  }, [usersToFilter, filters]);

  const resetTableFunc = () => {
    getUsers();
  };

  useEffect(() => {
    document.title = "Users List";
    getUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [filters.status]);

  return (
    <section id="UsersList" className="UsersList">
      <div className="wrapper">
        <div className="UsersList_Container">
          <UsersListTable
            users={users}
            filters={filters}
            setFilters={setFilters}
            refreshTableFunc={resetTableFunc}
            isLoading={isLoading}
          />
        </div>
      </div>
    </section>
  );
}

export default UsersList;
