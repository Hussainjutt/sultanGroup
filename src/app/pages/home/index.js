import React from "react";
import styled from "styled-components";
import Layout from "../../layout";
import Clients from "./components/clients";
import News from "./components/news";
import Partners from "./components/partners";
import Services from "./components/services";
import Swiper from "./components/swiper";
import Bg from "../../assets/image/backgrounds/clients&partners.jpg";
import More from "./components/more";
const Index = () => {
  const Container = styled.div`
    padding: 2rem 0;
  `;
  const Wrapper = styled.div`
    margin: 2rem 0;
    background: url(${Bg});
    box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
    background-attachment: fixed;
    background-size: cover;
  `;
  return (
    <Layout>
      <Swiper />
      <Container>
        <Services />
        <News />
        <Wrapper>
          <Partners />
          <Clients />
        </Wrapper>
        <More />
      </Container>
    </Layout>
  );
};

export default Index;
