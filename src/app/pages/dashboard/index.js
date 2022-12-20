import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { db } from "../../../firebase";
import DashBoard from "../../adminDashboard";
import Cards from "./components/card";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 2rem;
  padding: 5rem 3rem 3rem 3rem;
`;

const Index = () => {
  const [infos, setInfos] = useState({ prod: { all: "", draft: "" } });
  useEffect(() => {
    const prods = onSnapshot(doc(db, "products", "allProducts"), (doc) => {
      setInfos({
        ...infos,
        prod: {
          ...infos.prod,
          all: doc.data().data.filter((el) => el.isDraft === false).length,
          draft: doc.data().data.filter((el) => el.isDraft === true).length,
        },
      });
    });
    return () => {
      prods();
    };
  }, []);
  return (
    <DashBoard heading={"DashBoard"}>
      <Wrapper>
        <Cards
          variant={"dark"}
          h1={"Products"}
          p1={infos.prod.all}
          h2={infos.prod.draft}
          p2={"products in draft"}
        />
        <Cards variant={"primary"} h1={"h1"} h2={"h2"} p1={"p1"} p2={"p2"} />
        <Cards variant={"success"} h1={"h1"} h2={"h2"} p1={"p1"} p2={"p2"} />
        <Cards variant={"orange"} h1={"h1"} h2={"h2"} p1={"p1"} p2={"p2"} />
        <Cards variant={"pink"} h1={"h1"} h2={"h2"} p1={"p1"} p2={"p2"} />
      </Wrapper>
    </DashBoard>
  );
};

export default Index;
