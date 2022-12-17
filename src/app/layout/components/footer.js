import React from "react";
import styled from "styled-components";
import Logo from "../../assets/icon/main-icon2.png";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import Bg from "../../assets/image/backgrounds/footer.png";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
const Container = styled.div`
  background-color: #191919;
  padding: 4rem 2rem 1rem 2rem;
  position: relative;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: flex-start;
  grid-gap: 1rem;
  border-bottom: 1px solid #d1d1d1;
  padding-bottom: 1rem;
  background: url(${Bg}) #191919;
  background-size: contain;
`;
const Text = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  color: #b2b2b2;
  margin: 0.3rem 0;
  cursor: ${(props) => props.isLink && "pointer"};
  &:hover {
    color: ${(props) => props.isLink && "#04A5E5"};
  }
`;
const Link = styled.a`
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  color: #b2b2b2;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: #b2b2b2;
  }
`;
const Heading = styled.h2`
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  margin: 0.7rem 0;
  color: white;
`;
const Div = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`;
const Box = styled.div`
  max-width: 300px;
`;
const Input = styled.input`
  padding: 0.6rem 1rem;
  outline: none;
  border: none;
  background-color: #303030;
  color: white;
  border-radius: 4px 0 0 4px;
  width: 100%;
`;
const InputWrapper = styled.div`
  display: flex;
  margin: 1rem 0;
`;
const Button = styled.button`
  outline: none;
  border: none;
  color: white;
  background-color: #04a5e5;
  border-radius: 0 4px 4px 0;
`;
const Icon = styled.a`
  color: white;
  text-decoration: none;
  margin: 6px;
  padding: 1px 6px 4px 6px;
  border-radius: 4px;
  background: ${(props) =>
    props.variant === "fb"
      ? "#1877f2"
      : props.variant === "tw"
      ? "#55acee"
      : props.variant === "ld"
      ? "#0961B8"
      : props.variant === "insta"
      ? "linear-gradient(29.61deg, #f38334 0%, #da2e7d 50.39%, #6b54c6 100%)"
      : "#b00"};
  &:hover {
    color: white;
    transition: 0.25s;
    transform: scale(1.03);
  }
`;
const Info = styled.div`
  padding-top: 1rem;
  display: flex;
  align-items: center;
  grid-gap: 2rem;
  flex-wrap: wrap;
`;
const CopyRight = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #b2b2b2;
`;
const Footer = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Wrapper>
        <Box>
          <Heading>INFORMATION</Heading>
          <Div>
            <Text>City : 1</Text>
          </Div>
          <Div>
            <Text>
              Address : 4km, Luddan road Vehari-61100, Punjab, Pakistan
            </Text>
          </Div>
          <Div>
            <Text>
              Phone : <Link href="tel:+923070883080">+923070883080</Link> |{" "}
              <Link href="tel:+923335014403">+923335014403</Link>
            </Text>
          </Div>
          <Div>
            <Text>
              Email :{" "}
              <Link href="mailto:sultangroup.org@gmail.com">
                sultangroup.org@gmail.com
              </Link>{" "}
              |{" "}
              <Link href="mailto:info@sultangroup.org">
                info@sultangroup.org
              </Link>
            </Text>
          </Div>
        </Box>
        <Box>
          <Heading>DISCOVER</Heading>
          {[
            { title: "Home", route: "/" },
            { title: "About Us", route: "/about-us" },
            { title: "Blogs", route: "/blogs" },
            { title: "Contact", route: "/contact" },
          ].map((el, i) => (
            <Text key={i} isLink={true} onClick={() => navigate(el?.route)}>
              {el.title}
            </Text>
          ))}
        </Box>
        <Box>
          <Heading>COMPANY</Heading>
          {[
            { title: "FAQ'S", route: "/faqs" },
            { title: "Privacy Policy", route: "/privacy-policy" },
            { title: "Terms & Conditions", route: "/terms&conditions" },
          ].map((el, i) => (
            <Text key={i} isLink={true} onClick={() => navigate(el?.route)}>
              {el.title}
            </Text>
          ))}
        </Box>
        <Box>
          <Box style={{ marginBottom: "1rem" }}>
            <Heading>SOCIAL MEDIA</Heading>
            <Div>
              {[
                {
                  icon: FaFacebookF,
                  for: "fb",
                  route: "https://www.facebook.com/sultangroup.org/",
                },
                {
                  icon: FaTwitter,
                  for: "tw",
                  route: "https://twitter.com/SultanGroup6",
                },
                {
                  icon: FaLinkedinIn,
                  for: "ld",
                  route: "https://www.linkedin.com/",
                },
                {
                  icon: FaInstagram,
                  for: "ig",
                  route: "https://www.instagram.com/sultangrouporg/",
                },
                {
                  icon: FaYoutube,
                  for: "yt",
                  route:
                    "https://www.youtube.com/channel/UCvDge-X2aydSyH1vJxkLpBA",
                },
              ].map((el, i) => (
                <Icon variant={el?.for} href={el?.route}>
                  <el.icon />
                </Icon>
              ))}
            </Div>
          </Box>
          <Box>
            <Heading>Join Our Newsletter Now</Heading>
            <Text>
              Get E-mail updates about our latest shop and special offers.
            </Text>
            <Formik
              initialValues={{
                email: "",
              }}
              onSubmit={(values) => {
                console.log(values);
              }}
              validationSchema={schema}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <InputWrapper>
                    <Input
                      value={values.email}
                      type="text"
                      name="email"
                      placeholder="Enter Your mail"
                      onChange={handleChange}
                    />
                    <Button type="submit">Subscribe</Button>
                  </InputWrapper>
                  {errors.email && touched.email && (
                    <small
                      className="text-danger "
                      style={{
                        position: "relative",
                        top: "-10px",
                        fontWeight: "600",
                      }}
                    >
                      {errors.email}
                    </small>
                  )}
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Wrapper>

      <Info>
        <img src={Logo} width="200" />
        <CopyRight>
          Copyright ©2022 All rights reserved by Sultan Group | Developed And
          Designed By <Link href="https://cyborgmediatech.com/">CMT</Link>
        </CopyRight>
      </Info>
    </Container>
  );
};
const schema = yup.object().shape({
  email: yup.string().email("Not an valid email").required("Email is required"),
});

export default Footer;
