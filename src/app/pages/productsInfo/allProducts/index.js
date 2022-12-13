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
  // justify-content: center;
  grid-gap: 2rem;
`;
const Index = () => {
  const navigate = useNavigate();
  return (
    <DashBoard heading={"All Products"}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SearchBar />
          <Button variant="primary" onClick={() => navigate("/create-blog")}>
            Create Product
          </Button>
        </div>
        <h1
          className="text-center mb-3"
          style={{ color: "#26B00F", fontWeight: "600" }}
        >
          Products
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
