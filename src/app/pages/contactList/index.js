import React from "react";
import Dashboard from "../../adminDashboard";
import Table from "./table/index";
const Index = () => {
  return (
    <Dashboard heading={"Contact List"}>
      <div className="p-3">
        <Table />
      </div>
    </Dashboard>
  );
};

export default Index;
