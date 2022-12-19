import React from "react";
import styled from "styled-components";
import { MdLocationPin } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const Container = styled.div`
  padding: 2rem 6%;
`;
const Text = styled.p`
  line-height: 22px;
  letter-spacing: 1px; ;
`;
const H1 = styled.h1`
  font-weight: 600;
  font-size: 50px;
  line-height: 63px;
  text-align: left;
  letter-spacing: 2px;
  margin: 1rem 0;
  background: -webkit-linear-gradient(#00a8e6, #28be11);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 576px) {
    font-size: 40px;
    line-height: 53px;
  }
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 2rem;
  @media (max-width: 800px) {
    grid-template-columns: auto;
  }
`;
const Card = styled.div`
  width: 100%;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.17);
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: #fff;
`;
const Box = styled.h5`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  grid-gap: 1rem;
  padding: 0 0.8rem;
  margin: 1rem 0;
  width: 100%;

  svg {
    // width: 200px;
    font-size: 25px;
    color: #01a7ea;
  }
`;
const Link = styled.a`
  text-decoration: none;
  color: #000;
  &:hover {
    color: #28bf11;
  }
  &::after {
    content: "/";
    margin: 0 3px;
    color: #01a7ea;
  }
  &:last-child {
    &::after {
      content: "";
    }
  }
`;
const Span = styled.span`
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const LocationCards = () => {
  const data = [
    {
      a: `4km, Luddan road Vehari-61100, Punjab, Pakistan`,
      phone: ["+92 307 0883080", "+92 333 5014403"],
    },
    {
      a: `3001, Hubei Agricultural Science and Technology Research and Extension Center, Nanhu Avenue, Hongshan District, Wuhan`,
      phone: ["+86 159 2636 6474"],
    },
    {
      a: `94 Norton Court Coles Road Milton Cambridge CB24 6BW`,
      phone: ["+44 749 558 8999"],
    },
    {
      a: `ffice P-196, Street # 2, Gulgushat colony, Main Halal Road, near Rabbani colony Bankers, 38000-Faisalabad`,
      phone: ["0307 0883080", "0333 5014403", "041 8728344"],
    },
  ];
  return (
    <Container>
      <H1>Our Office</H1>
      <Wrapper>
        {data.map((el, i) => (
          <Card>
            <iframe
              width="100%"
              height="300"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Sultan%20Group%20Cambridge%20+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
            <Box>
              <span>
                <MdLocationPin style={{ color: "#01A7EA" }} />
              </span>
              <Span>{el?.a}</Span>
            </Box>
            <Box>
              <span>
                <FaMobileAlt />
              </span>
              <p className="d-flex flex-wrap gap-1 m-0">
                {[
                  el?.phone?.map((el, i) => (
                    <Link href={`tel:${el.replaceAll(" ", "")}`} key={i}>
                      {el}
                    </Link>
                  )),
                ]}
              </p>
            </Box>
            <Box>
              <span>
                <HiMail />
              </span>
              <p className="d-flex flex-wrap gap-1 m-0">
                <Link href="mailto:sultangroup.org@gmail.com">
                  sultangroup.org@gmail.com
                </Link>
                <Link href="mailto:info@sultangroup.org">
                  info@sultangroup.org
                </Link>
              </p>
            </Box>
          </Card>
        ))}
      </Wrapper>
    </Container>
  );
};

export default LocationCards;
