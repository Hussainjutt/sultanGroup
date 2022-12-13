import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../../../firebase";
const Container = styled.div`
  align-self: start;
  background-color: #fff;
  width: 100%;
  max-width: 250px;
  border-radius: 12px;
  min-height: 60vh;
  padding: 2rem;
  box-shadow: 0px 0px 8px 2px rgba(66, 64, 64, 0.26);
  @media (max-width: 588px) {
    max-width: 100%;
  }
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
const Categories = ({ setCategory }) => {
  const [options, setOptions] = useState([]);
  const location = useLocation();
  console.log(location.pathname);
  const navigate = useNavigate();
  const CheckBox = ({ active, path }) => {
    const Container = styled.p`
      width: 16px;
      height: 16px;
      border: 1.2px solid #2abc14;
      border-radius: 4px;
      cursor: pointer;
      padding: 2px;
      margin: 0;
    `;
    const Box = styled.p`
      width: 10px;
      height: 10px;
      background-color: ${(props) => props?.change && "#0DA8DF"};
      margin: 0;
      border-radius: 50%;
    `;
    return (
      <Container>
        <Box change={active}></Box>
      </Container>
    );
  };
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "blogs", "category"), (doc) => {
      setOptions(doc.data()?.data);
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <Container>
      <H1>Categories</H1>
      {options.map((el, i) => (
        <Item
          onClick={() => {
            navigate(
              `/blogs/:${el?.label?.toLowerCase().replaceAll(/\s/g, "")}`
            );
            setCategory(el?.label);
          }}
        >
          <CheckBox
            active={
              location.pathname ===
              `/blogs/:${el?.label?.toLowerCase().replaceAll(/\s/g, "")}`
            }
            path={`/blogs/:${el?.label?.toLowerCase()}`}
          />
          <Text
            active={
              location.pathname ===
              `/blogs/:${el?.label?.toLowerCase().replaceAll(/\s/g, "")}`
            }
          >
            {el?.label}
          </Text>
        </Item>
      ))}
    </Container>
  );
};

export default Categories;
