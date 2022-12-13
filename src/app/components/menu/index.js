import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: absolute;
  background-color: #fff;
  position: absolute;
  background-color: #fff;
  padding: 0.5rem 1rem;
  width: 235px;
  left: -200px;
  z-index: 99;
  top: ${(props) => (props.show ? "60px" : "49px")};
  border: 1px solid #eeeff1;
  border-radius: 5px;
`;
const Item = styled.div`
  font-size: 15px;
  padding: 0.6rem;
  margin: 3px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    transition: 0.3s;
    background-color: #f9f9f9;
    border-radius: 4px;
    color: #00a8e8;
  }
`;
const Index = ({ show, setShow, list }) => {
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShow(null);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  function OutsideAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
      <Container show={show === 1} ref={wrapperRef}>
        {props.children}
      </Container>
    );
  }
  const navigate = useNavigate();
  OutsideAlerter.propTypes = {
    children: PropTypes.element.isRequired,
  };
  return (
    show && (
      <OutsideAlerter>
        {list?.map((el, i) => (
          <Item
            key={i}
            onClick={() => {
              el?.logout && localStorage.clear();
              navigate(el?.route);
            }}
          >
            {el?.title}
          </Item>
        ))}
      </OutsideAlerter>
    )
  );
};

export default Index;
