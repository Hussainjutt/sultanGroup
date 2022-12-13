import React, { useState } from "react";
import styled from "styled-components";

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
const Index = ({ active, i, setActive }) => {
  const [change, setChange] = useState(false);
  return (
    <Container
      onClick={() => {
        setActive(null);
      }}
    >
      <Box change={active === i}></Box>
    </Container>
  );
};

export default Index;
