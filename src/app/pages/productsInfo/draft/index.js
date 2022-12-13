import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DashBoard from "../../../adminDashboard";
import BlogCard from "./components/blogCard";
import SearchBar from "./components/searchBar";

const Container = styled.div`
  padding: 1rem 3rem;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 2rem;
`;
const Index = () => {
  const navigate = useNavigate();
  return (
    <DashBoard heading={"Products Draft"}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SearchBar />
          <Button variant="primary" onClick={() => navigate("/create-blog")}>
            Create Blog
          </Button>
        </div>
        <h1
          className="text-center mb-3"
          style={{ color: "#26B00F", fontWeight: "600" }}
        >
          Draft
        </h1>
        <Wrapper>
          {[...Array(9)].map((el, i) => (
            <BlogCard key={i} />
          ))}
        </Wrapper>
      </Container>
    </DashBoard>
  );
};

export default Index;
