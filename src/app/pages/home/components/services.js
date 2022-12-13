import React, { useState } from "react";
import styled from "styled-components";
import { IoMdOpen } from "react-icons/io";
import Img1 from "../../../assets/image/home/services/ex-1.jpg";
import Img2 from "../../../assets/image/home/services/ex-2.jpg";
import Img3 from "../../../assets/image/home/services/ex-3.jpg";
import Img4 from "../../../assets/image/home/services/ex-4.jpg";
import Img5 from "../../../assets/image/home/services/ex-5.jpg";
import Img6 from "../../../assets/image/home/services/ex-6.jpg";
import Img7 from "../../../assets/image/home/services/ex-7.jpg";
import Img8 from "../../../assets/image/home/services/ex-8.jpg";
import Img9 from "../../../assets/image/home/services/ex-9.png";
import Img10 from "../../../assets/image/home/services/ex-10.jpg";
import Img11 from "../../../assets/image/home/services/ex-11.jpg";
import Img12 from "../../../assets/image/home/services/ex-12.jpg";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 2rem 6%;
`;
const H1 = styled.h1`
  font-weight: 600;
  font-size: 50px;
  line-height: 63px;
  text-align: center;
  letter-spacing: 2px;
  background: -webkit-linear-gradient(#00a8e6, #28be11);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 576px) {
    font-size: 40px;
    line-height: 53px;
  }
`;
const Card = styled.div`
  width: 100%;
  max-width: 370px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  background-color: #eaeff2;
  border: 1px solid #eaeff2;
`;
const IMG = styled.img`
  width: 100%;
  max-height: 230px;
  min-height: 230px;
  max-width: 370px;
  object-fit: fill;
`;
const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
  color: #191919;
  margin: 0;
  padding: 1rem;
  text-align: center;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 2.5rem;
  justify-content: center;
  margin: 2rem 0;
  @media (max-width: 856px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 576px) {
    grid-template-columns: auto;
  }
`;
const Layer = styled.div`
  height: ${(props) => (props.show ? "100%" : "0")};
  transition: ease height 0.25s;
  background: rgba(7, 7, 7, 0.5);
  position: absolute;
  width: 100%;
  x-index: 999;
  bottom: 0;
  overflow: hidden;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Services = () => {
  const data = [
    {
      img: Img1,
      title: "ELISA, Chemicals & Enzymes",
      route: "/services",
    },
    { img: Img4, title: "Laboratory Machines & Devices", route: "/services" },
    { img: Img9, title: "Freight Forwarding & Shipping", route: "/services" },
    { img: Img7, title: "About Us", route: "/services" },
    { img: Img5, title: "Medical Supplies", route: "/services" },
    { img: Img12, title: "Microbiology & Cell Lines", route: "/services" },
    { img: Img3, title: "Seeds", route: "/services" },
    { img: Img8, title: "Downloads", route: "/services" },
    { img: Img6, title: "Primer and Sequencing", route: "/services" },
    { img: Img10, title: "Software House", route: "/services" },
    { img: Img11, title: "English Editing Services", route: "/services" },
    {
      img: Img2,
      title: "Molecular Biology Product & Reagents",
      route: "/services",
    },
  ];

  const [state, setState] = useState(null);
  const navigate = useNavigate();
  return (
    <Container>
      <H1>Our Services</H1>
      <Wrapper>
        {data?.map((el, i) => (
          <Card
            key={i}
            onMouseEnter={() => setState(i)}
            onMouseLeave={() => setState(null)}
          >
            <IMG src={el?.img} alt={i} />
            <Title>{el?.title}</Title>
            <Layer
              show={state === i}
              onClick={() => navigate(`${el?.route}:${el?.title}`)}
            >
              <IoMdOpen
                style={{ color: "white", fontSize: "30px" }}
                title={"view more"}
              />
            </Layer>
          </Card>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Services;
