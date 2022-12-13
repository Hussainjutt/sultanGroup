import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg && props.bg});
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 120px;
`;
const H1 = styled.h1`
  font-weight: 600;
  font-size: 70px;
  line-height: 63px;
  text-align: center;
  letter-spacing: 2px;
  background: -webkit-linear-gradient(#28be11, #00a8e6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 576px) {
    font-size: 40px;
    line-height: 53px;
  }
`;
const Banner = ({ bg, heading }) => {
  const location = useLocation();
  return (
    <Container bg={bg}>
      <H1>{heading}</H1>
    </Container>
  );
};

export default Banner;
