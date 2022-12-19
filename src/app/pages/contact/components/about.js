import React from "react";
import styled from "styled-components";
import logo from "../../../assets/icon/main-icon.png";
const Container = styled.div`
  padding: 3rem 6%;
`;
const Box = styled.div`
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.17);
  padding: 1rem 2rem 2rem 2rem;
  position: relative;
  border-radius: 0.75rem;
  background-color: #fff;
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
const About = () => {
  return (
    <Container>
      <H1>Contact</H1>
      <Box>
        <div className="d-flex justify-content-center mb-3">
          <h1>Welcome to contact Sultan Group ® </h1>
        </div>
        <Text>
          <Text>Company Profile</Text>
          <Text>
            SULTAN GROUP .org is located in Vehari City, in Punjab provinces. It
            is a high-tech enterprise engaged in the research and development,
            production and sales of laboratory-related products. Since the
            establishment of the company, we have always adhered to the creed of
            reputation first and quality first. The products are widely used in
            the research and development and production fields of life sciences,
            organic chemistry, materials science, analytical chemistry and other
            disciplines, and the sales scope is all over the world. At present,
            the company has established partnerships with many top foreign
            pharmaceutical R&D units.
          </Text>
          <Text>
            This platform is the nation's leading one-stop platform for
            purchasing scientific research products. It is jointly built by
            Wuhan Zhongkeyou Biological Technology Co., Ltd. SULTAN GROUP and
            many manufacturers. It has built huge storage bases in Wuhan,
            Beijing, Shanghai, Guangzhou, and Chengdu (Internationally), Vehari,
            Multan, Faisalabad, Lahore and Islamabad (Nationally), to truly
            realize the information and purchase of scientific research products
            directly from manufacturers to users , Integrated service platform.
            At the same time, the mall has a high-quality elite customer service
            team to answer questions online in real time, simplifying sales and
            purchases, and solving the problems of traditional marketing models
            such as information gaps, low discounts, and untimely services. In
            order to achieve the best price, convenient procurement, and
            worry-free after-sales.
          </Text>
          <Text>
            Product categories: chemical reagents, biological reagents, domestic
            instruments, imported instruments, safety protection, biological
            consumables, imported consumables, general consumables, glassware,
            office supplies, cleaning appliances, etc.
          </Text>
          <Text>Email: info@sultangroup.org</Text>
        </Text>
        <Text></Text>
      </Box>
    </Container>
  );
};

export default About;
