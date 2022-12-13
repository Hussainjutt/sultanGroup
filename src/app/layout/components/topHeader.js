import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import styled from "styled-components";
import { IoIosMail } from "react-icons/io";
import { IoLanguage } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";

const Container = styled.div`
  width: 100%;
  background-color: #00a8e8;
  color: white;
  padding: 0.4rem 2rem;
  display: flex;
  justify-content: space-between;
  @media (max-width: 856px) {
    display: none;
  }
`;
const Link = styled.a`
  text-decoration: none;
  color: #fff;
  &:hover {
    transition: 0.25s;
    color: #000;
    svg {
      transition: 0.25s;
      color: #000;
    }
  }
`;
const Box = styled.div`
  display: flex;
  align-items: end;
  grid-gap: 0.6rem;
  justify-content: flex-start;
  svg {
    font-size: 20px;
    color: #fff;
  }
  border-right: 1px solid #fff;
  padding: 0 1rem;
`;
const Wrapper = styled.div``;
const TopHeader = () => {
  return (
    <Container>
      <Wrapper className="d-flex">
        <Box>
          <IoIosMail />
          <Link href="mailto:sultangroup.org@gmail.com">
            sultangroup.org@gmail.com
          </Link>
        </Box>
        <Box>
          <MdLocalPhone />
          <Link href="tel:+923070883080">+92 307 0883080</Link>
        </Box>
      </Wrapper>
      <Wrapper className="d-flex">
        <Box>
          {[
            {
              icon: FaFacebookF,
              route: "https://www.facebook.com/sultangroup.org/",
            },
            { icon: FaTwitter, route: "https://twitter.com/SultanGroup6" },
            { icon: FaLinkedinIn, route: "https://www.linkedin.com/" },
            {
              icon: FaInstagram,
              route: "https://www.instagram.com/sultangrouporg/",
            },
            {
              icon: FaYoutube,
              route: "https://www.youtube.com/channel/UCvDge-X2aydSyH1vJxkLpBA",
            },
          ].map((el, i) => (
            <Link key={i} href={el?.route} target="_blank">
              <el.icon />
            </Link>
          ))}
        </Box>
        <p style={{ position: "relative", padding: "6px" }}>
          <IoLanguage
            style={{
              position: "absolute",
              top: "4px",
              fontSize: "22px",
              cursor: "pointer",
            }}
          />
        </p>
      </Wrapper>
    </Container>
  );
};

export default TopHeader;
