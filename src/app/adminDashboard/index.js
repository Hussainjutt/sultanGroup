import React, { useState } from "react";
import { useEffect } from "react";
import Header from "./components/header";
import SideBar from "./components/sidebar";
const Index = ({ children, heading }) => {
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <Header heading={heading} setOpen={setOpen} />
      {children}
      <SideBar setOpen={setOpen} isOpen={isOpen} />
    </div>
  );
};

export default Index;
