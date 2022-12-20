import React, { useEffect, useState } from "react";
import { MdMiscellaneousServices } from "react-icons/md";
import { MdOutlineEditCalendar } from "react-icons/md";
import { GoMailRead } from "react-icons/go";
import { TiContacts } from "react-icons/ti";
import { RiFileEditFill } from "react-icons/ri";
import { CgBox } from "react-icons/cg";
import styled from "styled-components";

const Container = styled.div`
  background-color: #fff;
  padding: 0 16px;
  border-radius: 0.75rem;
  box-shadow: rgb(0 0 0 / 5%) 0rem 0.25rem 1.25rem 0rem,
    rgb(64 64 64 / 5%) 0rem 0.4375rem 0.625rem -0.3125rem;
`;
const Body = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const P = styled.p`
  font-weight: 300;
  font-size: 14px;
  line-height: 21px;
  color: #7b809a;
`;
const Text = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #4caf50;
`;
const Heading = styled.h1`
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #7b809a;
  padding: 0.4rem;
  margin-bottom: 0;
`;
const P2 = styled.p`
  font-weight: 700;
  font-size: 24px;
  color: #344767;
  margin: 0;
  text-align: right;
`;
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -24px;
  width: 4rem;
  height: 4rem;
  opacity: 1;
  color: rgb(255, 255, 255);
  border-radius: 0.75rem;
  box-shadow: rgb(0 0 0 / 14%) 0rem 0.25rem 1.25rem 0rem,
    rgb(64 64 64 / 40%) 0rem 0.4375rem 0.625rem -0.3125rem;
  background: ${(props) =>
    props.variant === "dark"
      ? "linear-gradient(195deg,rgb(66, 66, 74),rgb(25, 25, 25))"
      : props.variant === "primary"
      ? "linear-gradient(195deg,rgb(73, 163, 241),rgb(26, 115, 232))"
      : props.variant === "success"
      ? `linear-gradient(
        195deg,
        rgb(102, 187, 106),
        rgb(67, 160, 71)
      )`
      : props.variant === "pink"
      ? `linear-gradient(
      195deg,
      rgb(236, 64, 122),
      rgb(216, 27, 96)
    ) `
      : props.variant === "orange"
      ? `linear-gradient(195deg, orange, rgb(255, 187, 0))`
      : props.variant === "red" &&
        `linear-gradient(195deg, red, rgb(255, 60, 0))`};
  svg {
    font-size: 25px;
  }
`;
const Index = ({ variant, h1, h2, p1, p2 }) => {
  return (
    <>
      <Container>
        <Body>
          <LogoContainer variant={variant}>
            {variant === "dark" ? (
              <CgBox />
            ) : variant === "primary" ? (
              <RiFileEditFill />
            ) : variant === "success" ? (
              <TiContacts />
            ) : variant === "pink" ? (
              <GoMailRead />
            ) : variant === "orange" ? (
              <MdOutlineEditCalendar />
            ) : (
              variant === "red" && <MdMiscellaneousServices />
            )}
          </LogoContainer>
          <div>
            <Heading>{h1}</Heading>
            <P2>{p1}</P2>
          </div>
        </Body>
        <hr />
        <div>
          <P>
            <Text> {h2} </Text>
            {p2}
          </P>
        </div>
      </Container>
    </>
  );
};

export default Index;
