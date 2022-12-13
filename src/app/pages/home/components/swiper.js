import React, { useRef, useState } from "react";
import { Swiper as Container, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper";
import Img1 from "../../../assets/image/home/swiper/ex-1.png";
import Img2 from "../../../assets/image/home/swiper/ex-2.jpg";
import Img3 from "../../../assets/image/home/swiper/ex-3.jpg";
import Img4 from "../../../assets/image/home/swiper/ex-4.png";
import Img5 from "../../../assets/image/home/swiper/ex-5.png";
import Img6 from "../../../assets/image/home/swiper/ex-6.png";
import Img7 from "../../../assets/image/home/swiper/ex-7.jpg";
import Img8 from "../../../assets/image/home/swiper/ex-8.png";
import Img9 from "../../../assets/image/home/swiper/ex-9.jpg";
import Img10 from "../../../assets/image/home/swiper/ex-10.jpg";
import styled from "styled-components";

const Text = styled.h1`
  max-width: 350px;
  margin: 0 3rem;
  font-family: cursive;
  font-weight: 600;
  font-size: 50px;
  line-height: 63px;
  letter-spacing: 2px;
  text-align:right;
  background: -webkit-linear-gradient(#00a8e6, #28be11);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 576px) {
    font-size: 40px;
    line-height: 53px;
`;
const Swiper = () => {
  return (
    <>
      <Container
        effect={"fade"}
        pagination={{
          type: "progressbar",
        }}
        loop={true}
        navigation={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        className="mySwiper"
        // style={{ zIndex: "-1" }}
      >
        {[
          { img: Img1 },
          { img: Img2, text: "Plant Based Chemical Supplier" },
          { img: Img3 },
          { img: Img4 },
          { img: Img5 },
          { img: Img6 },
          { img: Img7 },
          { img: Img8 },
          { img: Img9, text: "Entomological Supplies" },
          { img: Img10 },
        ].map((el, i) => (
          <SwiperSlide
            style={{
              backgroundImage: `url(${el?.img})`,
              height: "100vh",
              backgroundSize: "cover",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text>{el?.text}</Text>
          </SwiperSlide>
        ))}
      </Container>
    </>
  );
};
export default Swiper;
