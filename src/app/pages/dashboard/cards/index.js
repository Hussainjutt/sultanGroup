import React from "react";
import styled from "styled-components";
import InfoCard from "./infoCard/index";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 4rem;
  padding: 3rem 6%;
`;
const Index = () => {
  return (
    <Container>
      <InfoCard
        variant="dark"
        h1="Products"
        p1="281"
        h2="30"
        p2="Products in draft"
      />
      <InfoCard
        variant="primary"
        h1="Product Quotes"
        p1="300"
        h2="24"
        p2="Quotes in moderation"
      />
      <InfoCard
        variant="success"
        h1="Contact List"
        p1="400"
        h2="+2%"
        p2="than last month"
      />
      <InfoCard
        variant="pink"
        h1="Newsletter"
        p1="91"
        h2="+5%"
        p2="Just updated"
      />
      <InfoCard
        variant="orange"
        h1="Blogs"
        p1="65"
        h2="15"
        p2="Blogs in draft"
      />
      <InfoCard
        variant="red"
        h1="Services"
        p1="10"
        h2="3"
        p2="Services are empty"
      />
    </Container>
  );
};

export default Index;
