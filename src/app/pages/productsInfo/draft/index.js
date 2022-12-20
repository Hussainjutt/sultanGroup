import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { HiEmojiSad } from "react-icons/hi";
import { TbMoodEmpty } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../../../firebase";
import DashBoard from "../../../adminDashboard";
import ProdCard from "./components/productCard";
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
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "products", "allProducts"), (doc) => {
      setLoader(true);
      if (category || search) {
        let dummy = doc.data().data;
        if (category) {
          dummy = dummy.filter(
            (el) => el?.category?.toLowerCase() === category
          );
        }
        if (search) {
          let arr = [];
          for (let i = 0; i < dummy.length; i++) {
            if (dummy[i].title.toLowerCase().includes(search.toLowerCase())) {
              arr.push(dummy[i]);
            }
          }
          dummy = arr;
        }
        setData(dummy.filter((el) => el?.isDraft === true).reverse());
      } else {
        setData(
          doc
            ?.data()
            .data.filter((el) => el?.isDraft === true)
            .reverse()
        );
      }
      setTimeout(() => {
        setLoader(false);
      }, 1400);
    });
    return () => {
      unSub();
    };
  }, [category, search]);
  return (
    <DashBoard heading={"Products/Draft"}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SearchBar setCatagory={setCatagory} setSearch={setSearch} />
          <Button variant="primary" onClick={() => navigate("/create-product")}>
            Create Product
          </Button>
        </div>
        <h1
          className="text-center mb-3"
          style={{ color: "#26B00F", fontWeight: "600" }}
        >
          Draft
        </h1>
        <Wrapper>
          {loader ? (
            <div className="d-flex justify-content-center">
              <Spinner variant={"info"} animation="border" />
            </div>
          ) : data.length === 0 ? (
            <h3 style={{ textAlign: "center" }}>
              There is no data <TbMoodEmpty />
            </h3>
          ) : (
            data.map((el, i) => <ProdCard key={i} data={el} arr={data} />)
          )}
        </Wrapper>
      </Container>
    </DashBoard>
  );
};

export default Index;
