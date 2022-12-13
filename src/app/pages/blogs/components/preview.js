import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../../../firebase";
import Layout from "../../../layout";
import SideBar from "./sidebar";
import CommentBox from "./commentBox";
const BlogWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  box-shadow: 0px 0px 16px 6px rgba(204, 204, 204, 0.75);
  border-radius: 0.75rem;
  position: relative;
  background-color: white;
  overflow-x: hidden;
  @media (max-width: 924px) {
    max-width: 100%;
  }
`;
const Img = styled.img`
  width: 100%;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(to right, #00a8e6, #28be11) border-box;
  border-radius: 0.75rem;
  border: 4px solid transparent;
  margin: 1rem 0;
`;
const H1 = styled.h1`
  font-family: "Comfortaa";
  margin: 1rem 0;
`;
const Text = styled.p`
  font-family: "Comfortaa";
  line-height: 26px;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 2rem;
  width: 100%;
  align-items: flex-start;
  padding: 2rem;
  @media (max-width: 924px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;
const Btn = styled.span`
  position: absolute;
  font-size: 33px;
  color: white;
  height: 41px;
  border-radius: 0.75rem 0;
  top: 0;
  left: 0;
  background-image: linear-gradient(316deg, #00a8e6, #28be11);
  cursor: pointer;
  transition: 1s;
  &::after {
    content: "";
    position: absolute;
    border-radius: 0.75rem 0;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    background-image: linear-gradient(145deg, #00a8e6, #28be11);
    opacity: 0;
    transition: all 300ms ease-in-out;
  }

  &:hover:after {
    opacity: 1;
  }
  svg {
    position: relative;
    top: -7px;
    padding: 2px;
    z-index: 99;
  }
`;
const Preview = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);

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

  let id = useParams().id.slice(1);
  useEffect(() => {
    if (id) {
      setLoader(true);
      const unSub = onSnapshot(doc(db, "blogs", "allBlogs"), (doc) => {
        doc.data().data.map((el, i) => {
          if (el?.id === id) {
            setData(el);
          }
        });
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      });
      return () => {
        unSub();
      };
    }
  }, [id]);
  return (
    <Layout>
      <Container>
        <div className="w-100">
          <BlogWrapper>
            <Btn onClick={() => navigate("/blogs")}>
              <HiOutlineArrowNarrowLeft />
            </Btn>
            <span
              style={{
                position: "absolute",
                top: "24px",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#2BBA15",
                fontWeight: "500",
              }}
            >
              {data?.category}
            </span>
            <span
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                color: "#00A8E8",
                fontWeight: "500",
              }}
            >
              {getDate(data?.date?.toDate())}
            </span>
            {loader ? (
              <Spinner variant="info" animation="border" size={200} />
            ) : (
              <>
                <H1>{data?.title}</H1>
                <Img src={data?.image} width="100%" />
                {data?.content && (
                  <div dangerouslySetInnerHTML={{ __html: data.content }} />
                )}
              </>
            )}
          </BlogWrapper>
          <CommentBox />
        </div>
        <SideBar />
      </Container>
    </Layout>
  );
};

export default Preview;
