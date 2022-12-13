import React from "react";
import styled from "styled-components";
import { IoCopy } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { toast } from "react-toastify";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useEffect } from "react";
import { useState } from "react";
const Container = styled.div`
  padding: 0 1rem 1rem 1rem;
  border-radius: 9px;
  max-height: 500px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #1d2a35;
    border-radius: 2rem;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: black;
  }
`;
const Heading = styled.h2`
  margin: 0;
  font-family: cursive;
  text-align: center;
  position: static;
  top: 0;
  padding: 0.7rem 0;
  width: 100%;
  z-index: 9;
  background-color: #fff;
  position: sticky;
  top: 0;
  color: #000;
  svg {
    margin: 0 10px -4px 0;
  }
`;
const Img = styled.img`
  width: 90px;
  height: 60px;
  border-radius: 8px;
  object-fit: fill;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0;
  border-bottom: 1px solid #ccc;
`;
const Title = styled.h3`
  margin: 0;
  max-width: 60%;
  font-size: 17px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Icon = styled.span`
  color: #000;
  font-size: 20px;
  cursor: pointer;
  svg {
    position: relative;
    bottom: 0px;
    &:active {
      color: #000;
    }
  }
`;

const SmallGellery = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "blogs", "imageGallery"), (doc) => {
      if (doc.exists()) {
        setData(doc.data().data);
      }
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <Container>
      <Heading>
        <FaLink />
        IMAGES
      </Heading>
      {data.map((el, i) => (
        <Box key={i}>
          <Img src={el?.src} />
          <Title>{el?.src}</Title>
          <Icon
            onClick={() => {
              try {
                navigator.clipboard.writeText(el?.src);
                toast.info("Image link copied");
              } catch (err) {
                toast.error(err);
              }
            }}
          >
            <IoCopy />
          </Icon>
        </Box>
      ))}
    </Container>
  );
};

export default SmallGellery;
