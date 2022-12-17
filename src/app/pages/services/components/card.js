import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TbDownload } from "react-icons/tb";
import { MdOutlineOpenInNew } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { storage } from "../../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const Container = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  max-width: 331px;
  align-items: start;
  justify-content: start;
  grid-gap: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 0.75rem;
  position: relative;
  background-color: white;
  justify-content: center;
  margin: auto;
  @media (max-width: 630px) {
    max-width: 100%;
  }
`;
const Link = styled.a`
  text-decoration: none;
  color: black;
  font-size: 30px;
  position: realtive;
  top: -16px;
`;
const Title = styled.p`
  font-size: 16px;
  letter-spacing: 1px;
  line-height: 20px;
  width: 100%;
  max-width: 175px;
  margin: 0;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Icon = styled.span`
  position: absolute;
  font-size: 25px;
  top: -7px;
  left: 1px;
  color: #00a8e8;
`;
const Card = ({ data }) => {
  return (
    <Container>
      <Title>{data?.title}</Title>
      <Link href={data?.src} target="_blank">
        <MdOutlineOpenInNew style={{ color: "#27BE10" }} />
      </Link>
      <Link href={data?.src} download={data?.title}>
        <TbDownload style={{ color: "#05A8EB" }} />
      </Link>
    </Container>
  );
};

export default Card;
