import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../../../firebase";
import DashBoard from "../../../adminDashboard";
import BlogCard from "./components/blogCard";
import SearchBar from "./components/searchBar";

const Container = styled.div`
  padding: 1rem 3rem;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  // justify-content: center;
  grid-gap: 2rem;
`;
const Index = () => {
  const navigate = useNavigate();
  const [category, setCatagory] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "blogs", "allBlogs"), (doc) => {
      if (category) {
        let dummy = doc
          .data()
          .data?.filter((el) => el?.category?.toLowerCase() === category);
        setData(dummy);
      } else {
        setData(doc?.data().data);
      }
    });
    return () => {
      unSub();
    };
  }, [category]);
  return (
    <DashBoard heading={"All Blogs"}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SearchBar setCatagory={setCatagory} />
          <Button variant="primary" onClick={() => navigate("/create-blog")}>
            Create Blog
          </Button>
        </div>
        <h1
          className="text-center mb-3"
          style={{ color: "#26B00F", fontWeight: "600" }}
        >
          Blogs
        </h1>
        <Wrapper>
          {data.map((el, i) => (
            <BlogCard key={i} data={el} />
          ))}
        </Wrapper>
      </Container>
    </DashBoard>
  );
};

export default Index;
