import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BsNutFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { db } from "../../../firebase";
import Layout from "../../layout";
import Product from "./components/card";
import { BiSad } from "react-icons/bi";
const Container = styled.div`
  background-color: #e8e8e847;
  padding: 2rem 0;
`;
const Wrapper = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 3rem;
`;
const Title = styled.p`
  max-width: 100px;
  overflow: hidden;
  margin: auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  color: ${(props) => props.active && "#28BE11"};
  &:hover {
    color: #00a8e8;
  }
`;
const H1 = styled.h1`
  font-weight: 600;
  font-size: 50px;
  line-height: 63px;
  text-align: center;
  letter-spacing: 2px;
  margin-top: 2rem;
  background: -webkit-linear-gradient(#00a8e6, #28be11);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 576px) {
    font-size: 40px;
    line-height: 53px;
  }
`;
const Index = () => {
  const param = useParams();
  let type = param?.type.slice(1);
  const navigate = useNavigate();
  const menu = [
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
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      onSnapshot(doc(db, "services", type), (doc) => {
        if (doc.exists()) {
          setData(doc?.data()?.data?.reverse());
        }
      });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  }, [type]);
  return (
    <Layout>
      <Container>
        <Swiper
          slidesPerView={"auto"}
          // spaceBetween={25}
          pagination={false}
          loop={true}
          navigation={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
        >
          {menu?.map((el, i) => (
            <SwiperSlide
              key={i}
              style={{
                maxWidth: "200px",
                textAlign: "center",
                padding: "0 4% 0 2%",
              }}
            >
              <Title
                active={type === el?.title}
                title={el?.title}
                onClick={() => navigate(`${el?.route}:${el.title}`)}
              >
                {" "}
                {el?.title}
              </Title>
            </SwiperSlide>
          ))}
        </Swiper>
        <H1>{type}</H1>
        {data.length ? (
          !loading ? (
            <Wrapper>
              {data.map((el, i) => (
                <Product key={i} data={el} />
              ))}
            </Wrapper>
          ) : (
            <div className="d-flex justify-content-center p-3">
              <Spinner variant="success" animation="border" />
            </div>
          )
        ) : (
          <h1 style={{ textAlign: "center", padding: "2rem" }}>
            No data found <BiSad />
          </h1>
        )}
      </Container>
    </Layout>
  );
};

export default Index;
