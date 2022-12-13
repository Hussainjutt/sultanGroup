import React from "react";
import { IoShieldCheckmark } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineClockCircle } from "react-icons/ai";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem 6%;
`;
const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1050px) {
    flex-wrap: wrap;
  }
  @media (max-width: 713px) {
    flex-direction: column;
  }
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 0.7rem;
  border: 1px solid #00a8e5;
  padding: 0.4rem 3rem;
  &:first-child {
    border-radius: 8px 0 0 8px;
  }
  &:nth-child(2) {
    border-left: none;
    border-right: none;
  }
  &:last-child {
    border-radius: 0 8px 8px 0;
  }
  p {
    margin: 0;
  }
  p:first-child {
    margin: 0;
    font-weight: 600;
  }
  @media (max-width: 1050px) {
    &:nth-child(2) {
      border-right: 1px solid #00a8e5;
      border-radius: 0 8px 8px 0;
    }
    &:last-child {
      border-top: none;
      border-radius: 0 0 8px 8px;
    }
  }
  @media (max-width: 713px) {
    &:nth-child(2) {
      border-top: none;
      border-bottom: none;
      border-radius: 0 0 0 0;
      border-left: 1px solid #00a8e5;
      padding: 0.4rem 53px;
    }
    &:first-child {
      border-radius: 8px 8px 0 0;
    }
    &:nth-child(3) {
      border-top: 1px solid #00a8e5;
      padding: 0.4rem 51px;
    }
  }
`;
const Icon = styled.p`
  color: #00a8e5;
  font-size: 40px;
  position: relative;
  &:first-child {
    font-size: 50px;
    bottom: 7px;
  }
  bottom: 3px;
`;
const More = () => {
  return (
    <Container>
      {" "}
      <Info>
        {[
          {
            icon: TbTruckDelivery,
            h: "SHIPMENT TRACKING",
            text: "Locate any time",
          },
          {
            icon: AiOutlineClockCircle,
            h: "DELIVERY ON TIME",
            text: "If good have prolems",
          },
          {
            icon: IoShieldCheckmark,
            h: "SECURE PAYMENT",
            text: "100% secure payment",
          },
        ].map((el, i) => (
          <Box>
            <Icon>
              <el.icon />
            </Icon>
            <div>
              <p>{el?.h}</p>
              <p>{el?.text}</p>
            </div>
          </Box>
        ))}
      </Info>
    </Container>
  );
};

export default More;
