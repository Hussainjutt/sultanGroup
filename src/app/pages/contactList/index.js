import React from "react";
import Dashboard from "../../adminDashboard";
import Table from "./table";
const Index = () => {
  return (
    <Dashboard heading={"Contect List"}>
      <div className="p-3">
        <Table />
      </div>
    </Dashboard>
  );
};

export default Index;
