import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../../assets/icon/main-icon.png";
import ServicesBg from "../../assets/image/header/services.jpg";
import flag1 from "../../assets/icon/flags/1.png";
import flag2 from "../../assets/icon/flags/2.png";
import flag3 from "../../assets/icon/flags/3.png";
import flag4 from "../../assets/icon/flags/4.png";
import { BiMenu } from "react-icons/bi";
import { GiMaterialsScience } from "react-icons/gi";
import { BsArrowRightShort } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { TbWorldDownload } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 99;
`;
const Logo = styled.img`
  height: auto;
  width: 240px;
  object-fit: fill;
  // margin: ${(props) => props.main && "auto"};
  display: ${(props) => props.main && "none"};
  @media (max-width: 950px) {
    display: ${(props) => (props.main ? "block" : "none")};
  }
`;
const Wrapper = styled.div`
  padding: 0 1rem;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: rgb(255 255 255 / 90%) 0rem 0rem 0.0625rem 0.0625rem inset,
    rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem;
  backdrop-filter: saturate(200%) blur(1.875rem);
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 12;
  @media (max-width: 856px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }
`;
const Menu = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  padding: 0 6%;
  width: 100%;
  // flex-wrap: wrap;
  grid-gap: 2rem;
  align-items: center;
  margin: 0;
  font-family: "Muli";
  font-weight: 600;
  @media (max-width: 1200px) {
    justify-content: center;
  }
  @media (max-width: 856px) {
    display: none;
  }
`;
const Item = styled.li`
  letter-spacing: 2px;
  cursor: pointer;
  border-radius: 2px;
  position: relative;
  color: ${(props) => props.active && "#34c11f"};
  white-space: nowrap;
  &:hover {
    color: #34c11f;
    transition: color 300ms ease-out;
  }
  &:hover > p {
    width: 100%;
    transition: width 300ms ease-out;
  }
  p {
    width: ${(props) => (props.active ? "100%" : "0")};
    border-bottom: 3px solid #00a9ed;
    margin: 0;
    position: relative;
    bottom: 0px;
  }
  @media (max-width: 950px) {
    display: ${(props) => props.isLogo && "none"};
  }
`;
const Icon = styled.span`
  display: none;
  font-size: 30px;
  background: #0aa3dc;
  padding: 2px 5px 5px 5px;
  color: white;
  border-radius: 4px;
  position: relative;
  width: 39px;
  height: 35px;
  cursor: pointer;
  svg {
    position: absolute;
  }
  @media (max-width: 856px) {
    display: unset;
  }
`;
const SubMenu = styled.div`
  width: 100%;
  transition: ${(props) =>
    props.active && "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"};
  box-shadow: ${(props) =>
    props.active &&
    "rgb(255 255 255 / 90%) 0rem 0rem 0.0625rem 0.0625rem inset,rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem"};
  backdrop-filter: ${(props) =>
    props.active && " saturate(200%) blur(1.875rem)"};
  background-color: ${(props) => props.active && "rgba(255, 255, 255, 0.8)"};
  z-index: 12;
  color: white;
  padding: 2rem 4rem;
  border-top: 1px solid #00a9e5;
  border-bottom: 1px solid #00a9e5;
  position: absolute;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 4rem;
`;
const Li = styled.span`
  color: black;
  cursor: pointer;
  margin: 4px 0;
  latter-spacing: 2px;
  position: relative;
  right: 0;
  &:hover {
    transform: scale(1.06);
    transition: transform 300ms ease-out;
    color: #01a8e7;
    transition: transform 333ms ease-out;
  }
  &:hover span {
    display: unset;
  }
`;
const H1 = styled.p`
  font-weight: 600;
  font-size: 25px;
  color: #000000;
  margin: 0;
`;
const Img = styled.img`
  width: 305px;
  height: 239px;
  opacity: 0.8;
  border-radius: 13px;
`;
const Arrow = styled.span`
  display: none;
  color: rgb(39, 190, 16);
`;
const Header = ({ setOpen }) => {
  const [show, setShow] = useState({ index: "", data: [] });
  const [offset, setOffset] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("load", onScroll);
  }, []);
  useEffect(() => {
    // if (offset > 44) {
    //   let el = document.getElementsByClassName("goog-te-banner-frame");
    //   if (el) {
    //     el[0].style.display = "none";
    //   }
    // } else {
    //   let el = document.getElementsByClassName("goog-te-banner-frame");
    //   if (el) {
    //     el[0].style.display = "unset";
    //     el[0].style.visibility = "visible";
    //   }
    // }
  }, [offset]);
  return (
    <Container
      onMouseLeave={() => {
        setShow({ ...show, index: "", data: [] });
      }}
    >
      <Wrapper active={true}>
        <Logo main={true} src={logo} onClick={() => navigate("/")} />
        <Icon>
          <BiMenu onClick={() => setOpen(true)} />
        </Icon>
        <Menu>
          <Item isLogo={true}>
            <Logo src={logo} onClick={() => navigate("/")} />
          </Item>
          {[
            // { title: "INDUSTRIES", haveSub: false, subMenu: [] },
            { title: "PRODUCTS", route: "/products", haveSub: false },
            {
              title: "SERVICES",
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
                { img: ServicesBg },
              ],
            },
            { title: "ABOUT US", route: "/about-us", haveSub: false },
            { title: "BLOGS", route: "/blogs", haveSub: false },
            { title: "CONTACT", route: "/contact", haveSub: false },
          ].map((el, i) => (
            <Item
              key={i}
              onMouseEnter={() => {
                if (el?.haveSub) {
                  setShow({ data: el?.subMenu, index: i });
                } else {
                  setShow({ ...show, index: "", data: [] });
                }
              }}
              onClick={() => {
                if (el?.route) {
                  navigate(el?.route);
                }
                if (show.index === i) {
                  setShow({ ...show, index: "", data: [] });
                }
              }}
              active={show.index === i || location.pathname === el?.route}
            >
              {el?.title}
              {el?.haveSub ? <MdOutlineKeyboardArrowDown /> : null}
              <p></p>
            </Item>
          ))}
        </Menu>
      </Wrapper>

      {show.index && (
        <SubMenu active={true}>
          <H1>
            Services{" "}
            <GiMaterialsScience
              style={{ position: "relative", bottom: "2px", color: "#01A8E7" }}
            />
          </H1>
          <div
            style={{
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            <Grid>
              {show?.data.map((el, i) => (
                <>
                  <Li
                    onClick={() => navigate(`${el?.route}:${el.title}`)}
                    className="position-relative"
                  >
                    {el?.title}{" "}
                    <Arrow className="position-absolute">
                      <BsArrowRightShort />
                    </Arrow>
                  </Li>
                </>
              ))}
            </Grid>
            <Img src={ServicesBg} width="100px" height="100px" />
          </div>
        </SubMenu>
      )}
    </Container>
  );
};

export default Header;
