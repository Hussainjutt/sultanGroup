import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import TopHeader from "./components/topHeader";
import Banner from "./components/banner";
import Sidebar from "./components/sidebar";

const Index = ({ children, bg = null, heading }) => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <TopHeader />
      <Header setOpen={setOpen} />
      {bg && <Banner bg={bg} heading={heading} />}
      {children}
      <Sidebar isOpen={isOpen} setOpen={setOpen} />
      <Footer />
    </div>
  );
};

export default Index;
