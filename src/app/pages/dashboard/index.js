import React from "react";
import DashBoard from "../../adminDashboard";
import Cards from "./cards";
const Index = () => {
  return (
    <DashBoard heading={"DashBoard"}>
      <Cards />
    </DashBoard>
  );
};

export default Index;
