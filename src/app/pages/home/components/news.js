import React, { useState } from "react";
import styled from "styled-components";
import { IoMdOpen } from "react-icons/io";

import { BsCalendarDate } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import Img1 from "../../../assets/image/home/news/ex-1.png";
import Img2 from "../../../assets/image/home/news/ex-2.jpg";
import Img3 from "../../../assets/image/home/news/ex-3.jpg";
import Img4 from "../../../assets/image/home/news/ex-4.jpg";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 2rem 6%;
`;
const H1 = styled.h1`
  font-weight: 600;
  font-size: 50px;
  line-height: 63px;
  text-align: center;
  letter-spacing: 2px;
  background: -webkit-linear-gradient(#00a8e6, #28be11);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 576px) {
    font-size: 40px;
    line-height: 53px;
  }
`;
const Card = styled.div`
  width: 100%;
  max-width: 370px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  background-color: #eaeff2;
  border: 1px solid #eaeff2;
`;
const IMG = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;
const Body = styled.div`
  padding: 1rem 0.4rem;
`;
const Title = styled.h3`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
  color: #191919;
  margin: 0.4rem 0;
`;
const Layer = styled.div`
  height: ${(props) => (props.show ? "100%" : "0")};
  transition: ease height 0.25s;
  background: rgba(7, 7, 7, 0.5);
  position: absolute;
  width: 100%;
  x-index: 999;
  bottom: 0;
  overflow: hidden;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Text = styled.p`
  color: gray;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 2.5rem;
  justify-content: center;
  margin: 2rem 0;
  @media (max-width: 856px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 576px) {
    grid-template-columns: auto;
  }
`;

const Date = styled.span`
  color: #36b7e8;
  svg {
    color: #27be10;
    margin: 4px;
    position: relative;
    bottom: 3px;
  }
`;
const User = styled.span`
  color: #36b7e8;
  svg {
    color: #27be10;
    margin: 4px;
    position: relative;
    bottom: 3px;
  }
`;

const News = () => {
  const [state, setState] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getDate = (data) => {
    let string = "";
    if (data) {
      let d = data;
      let m = d.toLocaleString("default", { month: "short" });
      let day = d?.getDate();
      let year = d?.getFullYear();
      string = `${m}.${day}.${year}`;
    }
    return string;
  };
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "blogs", "allBlogs"), (doc) => {
      setData(
        doc
          .data()
          ?.data?.filter(
            (el, i) =>
              el?.category?.toLowerCase() === "Latest News".toLowerCase()
          )
      );
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <Container>
      <H1>Latest News</H1>
      <Wrapper>
        {data?.map((el, i) => (
          <Card
            key={i}
            onMouseEnter={() => setState(i)}
            onMouseLeave={() => setState(null)}
            onClick={() => navigate(`blog/:${el?.id}`)}
          >
            <IMG src={el?.image} alt={i} />
            <Body>
              <Date>
                <BsCalendarDate />
                {getDate(el?.date?.toDate())}
              </Date>
              &nbsp; &nbsp;
              <User>
                <FaUserTie />
                {"Admin"}
              </User>
              <Title>{el?.title}</Title>
            </Body>
            <Layer show={state === i}>
              <IoMdOpen
                style={{ color: "white", fontSize: "30px" }}
                title={"view more"}
              />
            </Layer>
          </Card>
        ))}
      </Wrapper>
    </Container>
  );
};

export default News;
