import React, { useState } from "react";
import styled from "styled-components";
import CheckBox from "../../../components/checkbox";

const Container = styled.div`
  align-self: start;
  background-color: #fff;
  width: 100%;
  max-width: 250px;
  border-radius: 12px;
  min-height: 60vh;
  padding: 2rem;
  box-shadow: 0px 0px 8px 2px rgba(66, 64, 64, 0.26);
`;
const H1 = styled.h1`
  font-weight: 600;
  font-size: 30px;
  line-height: 43px;
  text-align: left;
  letter-spacing: 1px;
  background: -webkit-linear-gradient(#00a8e6, #28be11);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const Item = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  grid-gap: 0.6rem;
  margin: 0.4rem 0;
`;
const Text = styled.p`
  color: ${(props) => (props.active ? "#0DA8DF" : "gray")};
  margin: 0;
  font-size: 14px;
  font-family: cursive;
  cursor: pointer;
`;
const Categories = ({ setCategory, category }) => {
  const [active, setActive] = useState(null);
  return (
    <Container>
      <H1>Categories</H1>
      {["Latest News", "Case Study"].map((el, i) => (
        <Item
          onClick={() => {
            setCategory(el);
          }}
        >
          <CheckBox active={category} i={el} setActive={setCategory} />
          <Text active={category === el}>{el}</Text>
        </Item>
      ))}
    </Container>
  );
};

export default Categories;
