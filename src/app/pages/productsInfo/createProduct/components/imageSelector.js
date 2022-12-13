import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import styled from "styled-components";
import { db } from "../../../../../firebase";

const Container = styled.div`
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
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
const Img = styled.img`
  background: #ccc;
  border: 1px solid #ccc;
  object-fit: fill;
  padding: 0;
  border-radius: 10px;
  cursor: pointer;
`;
const Icon = styled.span`
  left: 12px;
  top: 0px;
  background-color: #00a8e8;
  padding: 0 3px 1px 3px;
  border-radius: 10px 0;
  color: white;
  cursor: pointer;
  z-index: 1;
`;
const Main = styled.div`
  &::after {
    box-shadow: 200px 200px 400px 200px rgba(39, 250, 13, 0.6) inset;
    ${(props) => props.active && ` content: "";`}
    display: block;
    height: 100%;
    position: absolute;
    top: 0;
    width: 89%;
    border-radius: 10px;
    cursor: pointer;
  }
`;
const ImageSelector = ({ setImage, image }) => {
  const [data, setData] = useState([]);
  const [select, setSelect] = useState(null);
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
  useEffect(() => {
    if (image?.isUrl === false) {
      setSelect(null);
    }
    data?.map((el, i) => {
      if (el?.src === image?.file.name) {
        setSelect(i);
      }
    });
  }, [image, data]);
  return (
    <Container>
      <h3
        className="position-sticky"
        style={{ top: 0, background: "#fff", zIndex: "30" }}
      >
        Click on Image to select it
      </h3>
      <div className="row p-2">
        {data.map((el, i) => (
          <Main
            className="col-6 my-2 position-relative"
            style={{ overflow: "hidden" }}
            active={select === i}
            onClick={() => {
              if (select === i) {
                setSelect(null);
                setImage({
                  ...image,
                  prev: "",
                  file: "",
                  isUrl: false,
                });
              } else {
                setImage({
                  ...image,
                  prev: el?.src,
                  file: { name: el?.src },
                  isUrl: true,
                });
                setSelect(i);
              }
            }}
          >
            <Img src={el?.src} draggable={false} width="100%" height="140px" />
            {select === i && (
              <Icon className="position-absolute">
                <BiCheck />
              </Icon>
            )}
          </Main>
        ))}
      </div>
    </Container>
  );
};

export default ImageSelector;
