import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
import { HiOutlineNewspaper } from "react-icons/hi";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import {
  MdConnectWithoutContact,
  MdMiscellaneousServices,
  MdOutlineContactMail,
} from "react-icons/md";
import Logo from "../../assets/icon/main-icon.png";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  // width: 100%;
  // height: 100vh;
`;
const Layer = styled.div`
  background: rgba(0, 0, 0, 0.6);
  transition: all linear 0.3s;
  position: fixed;
  inset: 0;
  z-index: 100;
`;
const Aside = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) => (props.show ? 0 : "-375px")};
  transition: left 0.7s;
  z-index: 200;
  height: 100vh;
  width: 315px;
  min-width: 315px;
  background-color: #fff;
  padding: 2rem;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  grid-gap: 1rem;
  cursor: pointer;
  padding-left: 0.4rem;
  p {
    font-weight: 700;
    font-size: 15px;
    margin: 0;
  }
  span {
    font-size: 13px;
    color: #616161;
    font-weight: 400;
  }
`;
const Body = styled.div`
  padding: 2rem 0;
  height: 75vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;
const Item = styled.p`
  margin: 0.5rem 0;
  border-radius: 0.25rem;
  padding: 1rem 1.25rem;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  grid-gap: 1rem;
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    background-color: #eff0f2;
  }
  svg {
    font-size: 20px;
  }
`;
const Text = styled.p`
  font-size: 15px;
  font-weight: 600;
  margin: 0;
`;
const NestedMenu = styled.div`
  max-height: 0;
  background-color: white;
  overflow: hidden;
  transition: max-height 0.4s ease-out;
`;
const Main = styled.div`
  &:hover .custom-according {
    max-height: 200px;
    overflow-y: auto;
  }
  &:hover .list_item {
    color: white !important;
    background-color: #34c21d;
    svg {
      color: white !important;
    }
  }
`;
const Footer = styled.div`
  height: 25vh;
  border-top: 1px solid #eff0f2;
`;
const Menu = [
  { title: "Home", route: "/", icon: FaHome, haveSub: false },
  {
    title: "Services",
    icon: MdMiscellaneousServices,
    haveSub: true,
    subMenu: [
      {
        title: "ELISA, Chemicals & Enzymes",
        route: "/services",
      },
      { title: "Laboratory Machines & Devices", route: "/services" },
      { title: "Freight Forwarding & Shipping", route: "/services" },
      { title: "About Us", route: "/services" },
      { title: "Medical Supplies", route: "/services" },
      { title: "Microbiology & Cell Lines", route: "/services" },
      { title: "Seeds", route: "/services" },
      { title: "Downloads", route: "/services" },
      { title: "Primer and Sequencing", route: "/services" },
      { title: "Software House", route: "/services" },
      { title: "English Editing Services", route: "/services" },
      {
        title: "Molecular Biology Product & Reagents",
        route: "/services",
      },
    ],
  },
  {
    title: "Products",
    icon: AiOutlineShop,
    haveSub: false,
    route: "/products",
  },
  {
    title: "Blogs",
    icon: HiOutlineNewspaper,
    haveSub: false,
    route: "/blogs",
  },
  {
    title: "About US",
    icon: BsInfoCircle,
    haveSub: false,
    route: "/about-us",
  },
  {
    title: "Contact",
    icon: MdOutlineContactMail,
    haveSub: false,
    route: "/contact",
  },
];
const Sidebar = ({ setOpen, isOpen }) => {
  const [show, setShow] = useState(null);
  const navigate = useNavigate();
  return (
    <Container>
      <Aside show={isOpen}>
        <Header onClick={() => navigate("/")}>
          <img src={Logo} width="100%" />
        </Header>
        <Body>
          {Menu.map((el, i) => (
            <Main
              onMouseEnter={() => {
                setShow(i);
              }}
              onMouseLeave={() => {
                setShow(null);
              }}
            >
              <Item
                key={i}
                className="list_item"
                onClick={() => {
                  if (!el?.haveSub) {
                    setOpen(false);
                  }
                  navigate(el?.route);
                }}
              >
                <div className="d-flex justify-content-start gap-3">
                  <el.icon
                    style={{
                      color: "#00A8E8",
                    }}
                  />
                  <Text> {el?.title}</Text>
                </div>
                {el?.haveSub ? (
                  show === i ? (
                    <IoIosArrowDown
                      style={{
                        fontSize: "14px",
                        position: "relative",
                        bottom: "-5px",
                      }}
                    />
                  ) : (
                    <IoIosArrowBack
                      style={{
                        fontSize: "14px",
                        position: "relative",
                        bottom: "-5px",
                      }}
                    />
                  )
                ) : null}
              </Item>
              <NestedMenu className="custom-according px-3">
                {el?.subMenu?.map((el, i) => (
                  <Item
                    key={i}
                    onClick={() => {
                      navigate(`${el?.route}:${el?.title}`);
                      setOpen(false);
                    }}
                  >
                    {el?.title}
                  </Item>
                ))}
              </NestedMenu>
            </Main>
          ))}
        </Body>
      </Aside>
      {isOpen && <Layer onClick={() => setOpen(false)} />}
    </Container>
  );
};

export default Sidebar;
