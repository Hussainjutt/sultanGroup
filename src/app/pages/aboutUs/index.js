import React from "react";
import Layout from "../../layout";
import About from "./components/about";
import Members from "./components/members";
import Companies from "./components/companies";
const Index = () => {
  return (
    <Layout>
      <About />
      <Members />
      <Companies />
    </Layout>
  );
};

export default Index;
