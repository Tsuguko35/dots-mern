import React, { useContext } from "react";
import PageHeader from "./PageHeader";
import { NotificationContext } from "../context/context";

function DashboardSkeletonLoading() {
  const { user } = useContext(NotificationContext);

  const userDetails = user;

  return (
    <div className="wrapper loading">
      <PageHeader page={"Dashboard"} />

      <div className="Dashboard_Grids">
        {/* Row 1 */}
        <div className="Dashboard_Grid_Container Top">
          <div className="Dashboard_Grid_Card Welcome"></div>

          <div className="Dashboard_Grid_Card Archive"></div>

          <div className="Dashboard_Grid_Card DocToday"></div>

          <div className="Dashboard_Grid_Card DocMonth"></div>

          <div className="Dashboard_Grid_Card DocYear"></div>
        </div>

        {/* Row 2 */}
        <div
          className={`Dashboard_Grid_Container Middle ${
            userDetails.role === "Faculty" && "Faculty"
          }`}
        >
          <div className="Dashboard_Grid_Card Graph1"></div>
          {userDetails.role !== "Faculty" && (
            <div className="Dashboard_Grid_Card Graph2"></div>
          )}
          {userDetails.role !== "Faculty" && (
            <div className="Dashboard_Grid_Card Graph3"></div>
          )}
          <div className="Dashboard_Grid_Card Graph4 Calendar"></div>
        </div>

        {/* Row 3 */}
        {userDetails.role !== "Faculty" && (
          <div className="Dashboard_Grid_Container Bottom">
            <div className="Dashboard_Grid_Card Box1">
              <div className="Box_Wrapper"></div>
            </div>
            <div className="Dashboard_Grid_Card Box2">
              <div className="Box_Wrapper"></div>
            </div>
            <div className="Dashboard_Grid_Card Box3">
              <div className="Box_Wrapper"></div>
            </div>
          </div>
        )}
      </div>

      {/* Dash Table */}
      <div className="Dashboard_Table_Container">
        <div className="Dashboard_Table"></div>
      </div>
    </div>
  );
}

export default DashboardSkeletonLoading;
