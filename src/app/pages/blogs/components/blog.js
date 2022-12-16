import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Modal, Form, Spinner } from "react-bootstrap";
import { IoExpandOutline } from "react-icons/io5";
import styled from "styled-components";
import Img1 from "../../../assets/image/blogs/1.jpg";
import Img2 from "../../../assets/image/blogs/2.jpg";
import Img3 from "../../../assets/image/blogs/3.jpg";
import Img4 from "../../../assets/image/blogs/4.png";
import Img5 from "../../../assets/image/blogs/5.jpeg";
import Img6 from "../../../assets/image/blogs/6.jpg";
import Img7 from "../../../assets/image/blogs/7.png";
import { FcInfo } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
const Container = styled.div``;
const Card = styled.div`
  width: 100%;
  max-width: 350px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #eaeff2;
  @media (max-width: 588px) {
    max-width: 100%;
  }
`;
const H1 = styled.h1`
  font-weight: 600;
  font-size: 50px;
  line-height: 63px;
  text-align: left;
  letter-spacing: 2px;
  background: -webkit-linear-gradient(#00a8e6, #28be11);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 576px) {
    font-size: 40px;
    line-height: 53px;
  }
`;
const IMG = styled.img`
  width: 100%;
  object-fit: cover;
  margin: auto;
  display: block;
  border-radius: 12px;
  height: 250px;
`;
const Body = styled.div`
  padding: 0 1rem 1rem 1rem;
`;
const Title = styled.h3`
  display: -webkit-box;
  -webkit-line-clamp: 1;
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
const Category = styled.p`
  margin: 0;
  font-weight: 600;
  background: linear-gradient(to left, #00a8e6, #28be11);
  color: white;
  display: inline-block;
  padding: 0.4rem;
  font-size: 14px;
  border-radius: 27px;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 2rem;
  width: 100%;
`;
const Prev = styled.img`
  width: 100%;
  max-height: 500px;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(to right, #00a8e6, #28be11) border-box;
  border-radius: 9px;
  border: 4px solid transparent;
`;
const Blogs = () => {
  const [show, setShow] = useState(null);
  const [data, setData] = useState([]);
  const [Loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const getDate = (data) => {
    let string = "";
    let d = data;
    let m = d.toLocaleString("default", { month: "short" });
    let day = d?.getDate();
    let year = d?.getFullYear();
    string = `${m}.${day}.${year}`;
    return string;
  };
  const category = useParams();
  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  }
  let empty = isEmpty(category);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "blogs", "allBlogs"), (doc) => {
      setLoader(true);
      if (empty) {
        setData(doc?.data()?.data);
      } else {
        if (category) {
          let q = category?.category?.slice(1)?.toLowerCase();
          console.log(q);
          let dummy = doc
            .data()
            .data?.filter(
              (el) => el?.category?.toLowerCase().replaceAll(/\s/g, "") === q
            );
          setData(dummy);
        } else {
          setData(doc?.data().data.filter((el) => el.isDraft === false));
        }
      }
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    });
    return () => {
      unSub();
    };
  }, [category]);
  return (
    <Wrapper>
      {Loader ? (
        <Spinner variant="info" animation="border" size="lg" />
      ) : data.length === 0 ? (
        <h1 style={{ textAlign: "center", marginTop: "3rem" }}>
          No data Found
        </h1>
      ) : (
        data?.map((el, i) => (
          <Card
            key={i}
            onMouseEnter={() => {
              setShow(i);
            }}
            onMouseLeave={() => {
              setShow(null);
            }}
          >
            <div className="p-3">
              <IMG src={el?.image} />
            </div>
            <Body>
              <Category>{el?.category}</Category>
              <Title>{el?.title}</Title>
              <div className="d-flex justify-content-between">
                <Text>{getDate(el?.date?.toDate())}</Text>
              </div>
            </Body>
            <Layer
              show={show === i}
              onClick={() => navigate(`/blog/:${el?.id}`)}
            >
              <IoExpandOutline
                style={{ color: "white", fontSize: "30px" }}
                title={"view more"}
              />
              <span></span>
            </Layer>
          </Card>
        ))
      )}
    </Wrapper>
  );
};

export default Blogs;
