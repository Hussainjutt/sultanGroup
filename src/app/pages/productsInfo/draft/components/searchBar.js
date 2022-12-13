import React, { useState } from "react";
import styled from "styled-components";
import {
  MdOutlineArrowDropDown,
  MdNotInterested,
  MdOutlineArrowDropUp,
} from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
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
    width: 0px;
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
const SearchBar = () => {
  const [val, setVal] = useState("Catergoies");
  const [show, setShow] = useState(false);
  const Select = () => {
    return (
      <Box onClick={() => setShow(!show)}>
        <Small style={{ color: val !== "Catergoies" && "#000" }}>{val}</Small>
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
  return (
    <Main>
      <Container>
        <Select />
        <div></div>
        <Input type={"text"} placeholder="Search" />
        <BiSearchAlt2
          style={{
            fontSize: "25px",
            color: "#00A8E8",
          }}
        />
      </Container>
      {show && (
        <Menu onMouseLeave={() => setShow(false)}>
          <Option
            onClick={() => {
              setVal("Catergoies");
              setShow(false);
            }}
          >
            None <MdNotInterested style={{ fontSize: "12px" }} />
          </Option>
          {[1, 2, 3, 4].map((el, i) => (
            <Option
              key={i}
              onClick={() => {
                setVal("jiji" + i);
                setShow(false);
              }}
            >
              jiji
            </Option>
          ))}
        </Menu>
      )}
    </Main>
  );
};

export default SearchBar;
