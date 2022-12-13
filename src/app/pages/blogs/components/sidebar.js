import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../../../firebase";
import CheckBox from "../../../components/checkbox";

const Container = styled.div`
  background-color: #fff;
  align-self: stretch;
  width: 100%;
  max-width: 350px;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0px 0px 8px 2px rgba(66, 64, 64, 0.26);
`;
const H1 = styled.h1`
  font-weight: 600;
  font-size: 30px;
  line-height: 43px;
  text-align: left;
  letter-spacing: 1px;
  background: -webkit-linear-gradient(#00a8e6, #28be11);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const Item = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  grid-gap: 0.6rem;
  margin: 0.4rem 0;
`;
const Text = styled.p`
  color: ${(props) => (props.active ? "#0DA8DF" : "gray")};
  margin: 0;
  font-size: 14px;
  font-family: cursive;
  cursor: pointer;
`;
const Link = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #00a8e5;
  letter-spacing: 1px;
  margin-bottom: 0.4rem;
  cursor: pointer;
  border-bottom: 1px solid #27be11;
  padding: 4px 0;
`;
const SideBar = () => {
  const [active, setActive] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "blogs", "allBlogs"), (doc) => {
      setData(doc.data().data);
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <Container>
      <H1>Search Here</H1>
      <FloatingLabel controlId="floatingInput" label="Search" className="mb-3">
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <br />
      <br />
      <H1>Categories</H1>
      {["Latest News", "Case Study"].map((el, i) => (
        <Item
          onClick={() => {
            setActive(i);
          }}
        >
          <CheckBox active={active} i={i} setActive={setActive} />
          <Text active={active === i}>{el}</Text>
        </Item>
      ))}
      <br />
      <br />
      <H1>Recent Posts</H1>
      {data?.map((el, i) => (
        <Link key={i} onClick={() => navigate(`/blog/:${el?.id}`)}>
          {el?.title}
        </Link>
      ))}
    </Container>
  );
};

export default SideBar;
