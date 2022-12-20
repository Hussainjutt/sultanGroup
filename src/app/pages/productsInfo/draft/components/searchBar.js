import React, { useState } from "react";
import styled from "styled-components";
import {
  MdOutlineArrowDropDown,
  MdNotInterested,
  MdOutlineArrowDropUp,
} from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../firebase";
const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
  margin: auto;
  background-color: #fff;
  padding-right: 13px;
  border-radius: 27px;
  overflow: hidden;
  border: 1px solid #eeeff1;
`;
const Input = styled.input`
  border: none;
  padding: 7px;
  font-size: 14px;
  outline: none;
  width: 100%;
  &::placeholder {
    color: #ccc;
  }
`;
const Box = styled.div`
  background-color: white;
  padding: 7px 8px 8px 11px;
  cursor: pointer;
  min-width: 118px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const Small = styled.small`
  color: #ccc;
  margin: 0 6px;
  font-size: 12px;
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
`;
const Menu = styled.div`
  position: absolute;
  background-color: #fff;
  padding: 0.5rem;
  width: 150px;
  z-index: 99;
  border: 1px solid #eeeff1;
  border-radius: 5px;
  left: 11px;
  top: 36px;
  max-height: 120px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #1d2a35;
    border-radius: 2rem;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: black;
  }
`;
const Option = styled.p`
font-size: 15px;
padding: 0rem;
margin: 3px;
max-width: 140px;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
padding:4px;
cursor:pointer;
&:hover {
transition: 0.3s;
background-color: #f9f9f9;
border-radius: 4px;
color: #00a8e8
`;
const Main = styled.div`
  width: 100%;
  max-width: 600px;
  position: relative;
`;
const SearchBar = ({ setCatagory, setSearch, search }) => {
  const [val, setVal] = useState("Catergoies");
  const [show, setShow] = useState(false);
  const [options, setOptions] = useState([]);
  const [inp, setInp] = useState("");
  const Select = () => {
    return (
      <Box onClick={() => setShow(!show)}>
        <Small
          style={{
            color: val !== "Catergoies" && "#000",
            textOverflow: val !== "Catergoies" ? "ellipsis" : "unset",
          }}
        >
          {val}
        </Small>
        {show ? (
          <MdOutlineArrowDropUp
            style={{ color: "#00A8E8", fontSize: "20px" }}
          />
        ) : (
          <MdOutlineArrowDropDown
            style={{ color: "#00A8E8", fontSize: "20px" }}
          />
        )}
      </Box>
    );
  };
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "products", "category"), (doc) => {
      setOptions(doc.data().data);
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <Main>
      <Container>
        <Select />
        <div></div>
        <Input
          type={"text"}
          placeholder="Search"
          value={inp}
          onChange={(e) => {
            setInp(e.target.value);
            setSearch(e.target.value);
          }}
        />
        <BiSearchAlt2
          style={{
            fontSize: "25px",
            color: "#00A8E8",
            cursor: "pointer",
          }}
          onClick={() => setSearch(inp)}
        />
      </Container>
      {show && (
        <Menu onMouseLeave={() => setShow(false)}>
          <Option
            onClick={() => {
              setVal("Catergoies");
              setCatagory("");
              setShow(false);
            }}
          >
            None <MdNotInterested style={{ fontSize: "12px" }} />
          </Option>
          {options.map((el, i) => (
            <Option
              key={i}
              onClick={() => {
                setVal(el?.value);
                setCatagory(el?.value?.toLowerCase());
                setShow(false);
              }}
            >
              {el?.label}
            </Option>
          ))}
        </Menu>
      )}
    </Main>
  );
};

export default SearchBar;
