import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../../layout";
import Categories from "./components/categories";
import Blog from "./components/blog";

const Container = styled.div`
  background-color: #e8e8e847;
  padding: 2rem;
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
const Wrapper = styled.div`
  display: flex;
  grid-gap: 2rem;
  @media (max-width: 588px) {
    flex-wrap: wrap;
  }
`;
const Link = styled.p`
  color: #34c11f;
  border-bottom: 2px solid #00a9ed;
  cursor: pointer;
  &:hover {
    color: #00a9ed;
    border-bottom: 2px solid #34c11f;
  }
`;
const Index = () => {
  const [category, setCategory] = useState(null);
  return (
    <Layout>
      <Container>
        <div className="d-flex">
          <Link onClick={() => setCategory(null)}>Blogs</Link>&nbsp;
          {category && (
            <>
              {" "}
              <span style={{ color: "#191919" }}>/</span>&nbsp;
              <Link>{category}</Link>
            </>
          )}
        </div>
        <Wrapper>
          <Categories setCategory={setCategory} category={category} />
          <Blog category={category?.toLowerCase()} />
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default Index;
