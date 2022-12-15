import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
import { TfiGallery, TfiWrite } from "react-icons/tfi";
import { BsPeople } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import Logo from "../../assets/icon/main-icon.png";
import { db } from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
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
  z-index: 10;
`;
const Aside = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) => (props.show ? 0 : "-375px")};
  transition: left 0.7s;
  z-index: 91;
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
  { title: "DashBoard", route: "/dashboard", icon: FaHome, haveSub: false },
  {
    title: "Image Galley",
    route: "/gallery",
    icon: TfiGallery,
    haveSub: false,
  },
  {
    title: "Blog",
    icon: TfiWrite,
    haveSub: true,
    subMenu: [
      { title: "Create Blog", route: "/create-blog" },
      { title: "All Blogs", route: "/all-blogs" },
      { title: "Draft", route: "/blogs-draft" },
    ],
  },
  {
    title: "Product",
    icon: AiOutlineShop,
    haveSub: true,
    subMenu: [
      { title: "Create Product", route: "/create-product" },
      { title: "All Products", route: "/all-products" },
      { title: "Draft", route: "/products-draft" },
    ],
  },
  {
    title: "People",
    icon: BsPeople,
    haveSub: true,
    subMenu: [
      { title: "Contact List", route: "/contact-list" },
      { title: "News Letters", route: "/news-letters" },
      { title: "Info Quotes", route: "/info-quotes" },
    ],
  },
];
const Sidebar = ({ setOpen, isOpen }) => {
  const [show, setShow] = useState(null);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "auth", "admin"), (doc) => {
      setData(doc?.data());
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <Container>
      <Aside show={isOpen}>
        <Header onClick={() => navigate("/profile")}>
          <img
            src={
              data.profileImage
                ? data.profileImage
                : "https://cashier-bdevs.vercel.app/assets/img/icon/watson.png"
            }
            className="rounded-circle border"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#ccc",
              objectFit: "fill",
            }}
          />
          <div>
            <p className="m-0">{data?.name ? data.name : "Sultan group"}</p>
            <span>Admin</span>
          </div>
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
                  <Item key={i} onClick={() => navigate(el?.route)}>
                    {el?.title}
                  </Item>
                ))}
              </NestedMenu>
            </Main>
          ))}
        </Body>
        <Footer>
          <img src={Logo} width="100%" />
        </Footer>
      </Aside>
      {isOpen && <Layer onClick={() => setOpen(false)} />}
    </Container>
  );
};

export default Sidebar;
