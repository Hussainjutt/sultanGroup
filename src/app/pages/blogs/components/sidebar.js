import { doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  FormControl,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import { toast } from "react-toastify";
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
  @media (max-width: 924px) {
    max-width: 100%;
  }
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
const BigBox = styled.div`
  max-height: 300px;
  overflow-y: auto;
  width: 100%;
  border: 1px solid #ccc;
  position: absolute;
  background: #fff;
  z-index: 20;
  padding: 5px;
  border-radius: 4px;
  top: 40px;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #ccc;
  }

  &::-webkit-scrollbar-thumb {
    background: #1c1c1c;
    border-radius: 4px;
  }
`;
const SideBar = () => {
  const [active, setActive] = useState(null);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState({ data: [], show: false });
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "blogs", "allBlogs"), (doc) => {
      setData(doc.data().data);
      if (search) {
        let dummy = [];
        for (let i = 0; i < doc.data().data.length; i++) {
          if (
            doc
              .data()
              .data[i].title.toLowerCase()
              .includes(search.toLowerCase())
          ) {
            dummy.push(doc.data().data[i]);
          }
        }
        setBlogs({ ...blogs, show: true, data: dummy });
      } else {
        setBlogs({ ...blogs, show: false, data: [] });
      }
    });
    const UnSub = onSnapshot(doc(db, "blogs", "category"), (doc) => {
      setCategory(doc?.data()?.data);
    });
    return () => {
      unSub();
      UnSub();
    };
  }, [search]);
  return (
    <Container>
      <H1>Search Here</H1>
      <div style={{ position: "relative" }}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search here"
            aria-label="Search here"
            aria-describedby="basic-addon2"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              console.log(e.target.value);
            }}
          />
          <Button
            variant="info"
            className="text-white"
            onClick={() => setSearch(search)}
            id="button-addon2"
          >
            Search
          </Button>
        </InputGroup>
        {blogs.show && (
          <BigBox>
            <FaWindowClose
              style={{
                position: "relative",
                right: "-255px",
                color: "#00A8E8",
                cursor: "pointer",
              }}
              onClick={() => {
                setBlogs({ ...blogs, data: [], show: false });
              }}
            />
            {loader ? (
              <Spinner variant="dark" animation="border" size="sm" />
            ) : blogs?.data.length != 0 ? (
              blogs?.data?.map((el, i) => (
                <div
                  className="d-flex align-items-center gap-1 p-2 blogs-dropDown "
                  style={{
                    position: "relative",
                    borderBottom: "1px solid gray",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(
                      `/blog/:${el?.title.toLowerCase().replace(/\s/g, "-")}`
                    );
                    setBlogs({ ...blogs, data: [], show: false });
                    setSearch("");
                  }}
                >
                  <img
                    src={el?.image}
                    style={{
                      width: "60px",
                      height: "55px",
                      borderRadius: "4px",
                      objectFit: "fill",
                    }}
                  />{" "}
                  <p className="m-0 position-relative w-100">
                    <p
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        margin: "0",
                        fontSize: "13px",
                      }}
                    >
                      {el?.title}
                    </p>
                    <small
                      style={{
                        fontWeight: "bold",
                        fontWeight: "bold",
                        position: "absolute",
                        right: "0",
                      }}
                    >
                      {el?.category}
                    </small>
                  </p>
                </div>
              ))
            ) : (
              <small>no data found</small>
            )}
          </BigBox>
        )}
      </div>
      <br />
      <H1>Categories</H1>
      {category?.map((el, i) => (
        <Link
          onClick={() => {
            navigate(
              `/blogs/:${el?.label?.toLowerCase().replaceAll(/\s/g, "")}`
            );
          }}
        >
          {el?.label}
        </Link>
      ))}
      <br />
      <br />
      <H1>Recent Posts</H1>
      {data?.map((el, i) => (
        <Link
          key={i}
          onClick={() =>
            navigate(`/blog/${el?.title.toLowerCase().replace(/\s/g, "-")}`)
          }
        >
          {el?.title}
        </Link>
      ))}
    </Container>
  );
};

export default SideBar;
