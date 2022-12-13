import React, { useState } from "react";
import styled from "styled-components";
import { CgMenuRight, CgProfile } from "react-icons/cg";
import { BsPlus, BsDot } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiLogOutCircle } from "react-icons/bi";
import { SlSettings } from "react-icons/sl";
import Menu from "../../components/menu";
const Container = styled.div`
  background-color: #fff;
  padding: 0.7rem 1rem;
  border-bottom: 1px solid #eff0f2;
  position: sticky;
  top: 0;
  z-index: 10;
`;
const Title = styled.h3`
  color: #616161;
  font-family: "Comfortaa";
  margin: 0;
`;
const Icon = styled.span`
  font-size: 25px;
  cursor: pointer;
  color: #616161;
  position: relative;
  small {
    position: absolute;
    color: red;
    left: 7px;
    top: -13px;
    font-size: 24px;
  }
`;
const AddIcon = styled.span`
  border: 1px solid #eff0f2;
  padding: 1px 5px 5px 5px;
  border-radius: 3px;
  font-size: 20px;
  color: #616161;
  cursor: pointer;
  position: relative;
`;
const Header = ({ heading, setOpen }) => {
  const [show, setShow] = useState(null);
  return (
    <Container className="d-flex justify-content-between align-items-center">
      <Title>{heading}</Title>
      <div className="d-flex gap-3 align-items-center">
        <div>
          <AddIcon className="mx-2" onClick={() => setShow(0)}>
            <BsPlus />
            <Menu
              show={show === 0}
              list={[
                { title: "Create Blog", route: "/create-blog" },
                { title: "Create Product", route: "/create-product" },
              ]}
              setShow={setShow}
            />
          </AddIcon>
          <Icon onClick={() => setOpen(true)}>
            <CgMenuRight />
          </Icon>
        </div>
        <div style={{ borderLeft: "1px solid #eff0f2" }}>&nbsp;</div>
        <Icon>
          <small>
            <BsDot />
          </small>
          <IoNotificationsOutline />
        </Icon>
        <Icon>
          <SlSettings onClick={() => setShow(1)} />
          <Menu
            show={show === 1}
            list={[
              {
                title: [
                  <span>
                    <CgProfile
                      style={{
                        fontSize: "20px",
                        position: "relative",
                        top: "-1px",
                      }}
                    />
                    &nbsp; Edit profile
                  </span>,
                ],
                route: "/profile",
              },
              {
                title: [
                  <span>
                    <BiLogOutCircle
                      style={{
                        fontSize: "20px",
                        position: "relative",
                        top: "-1px",
                      }}
                    />
                    &nbsp; Log Out
                  </span>,
                ],
                route: "/login",
                logout: true,
              },
            ]}
            setShow={setShow}
          />
        </Icon>
      </div>
    </Container>
  );
};

export default Header;
