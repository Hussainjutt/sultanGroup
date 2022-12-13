import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectCube,
  EffectCoverflow,
} from "swiper";
import styled from "styled-components";

const Container = styled.div`
  padding: 0;
`;
const Box = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  width: 232;
`;
const H1 = styled.h1`
  font-weight: 600;
  font-size: 50px;
  line-height: 63px;
  text-align: center;
  letter-spacing: 2px;
  color: white;
  @media (max-width: 576px) {
    font-size: 40px;
    line-height: 53px;
  }
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Partners = () => {
  return (
    <>
      <Container>
        <H1>Partners</H1>
        <Swiper
          centeredSlides={true}
          slidesPerView={"auto"}
          // navigation={true}
          // pagination={{
          //   type: "progressbar",
          // }}
          modules={[Pagination, Autoplay, Navigation]}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
          style={{ padding: " 0 2rem" }}
        >
          {[...Array(33)]?.map((el, i) => (
            <SwiperSlide style={{ width: "500px" }}>
              <Box>
                <img
                  src={require(`../../../assets/icon/partners/${i + 1}.png`)}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "90px",
                    minHeight: "60px",
                    minWidth: "100px",
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </>
  );
};
export default Partners;
