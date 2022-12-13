import React from "react";
import styled from "styled-components";
import Img from "../../assets/image/faqs/ex-1.svg";
import Layout from "../../layout";

const Container = styled.div`
  padding: 2rem 6%;
`;
const H1 = styled.h1`
  font-weight: 600;
  font-size: 50px;
  line-height: 63px;
  text-align: left;
  letter-spacing: 2px;
  background: -webkit-linear-gradient(#28be11, #00a8e6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 576px) {
    font-size: 35px;
    line-height: 43px;
  }
`;
const Box = styled.div`
  margin: 2rem 0;
  h3 {
    margin-bottom: 1rem;
    font-weight: 600;
  }
  p {
    margin-bottom: 0.4rem;
  }
`;
const Index = () => {
  return (
    <Layout>
      <Container>
        <H1>FAQ'S</H1>
        <img src={Img} width="40%" />
        {[
          {
            a: "How to order from company?",
            b: "Answer: Please go to our website check your desired product you wants to buy and then contact with company officials via provided email and phone numbers.",
          },
          {
            a: "How to pay against ordered product?",
            b: "When you are ready to transfer money must ask from company representative and re-confirm the account details before transfer.",
          },
          {
            a: "What is payment policy?",
            b: "If you have to place order for imported product, must share SO (Supply Order) or deposit 30% advance to confirm the order. Company not liable or responsible for any verbal conversation and 100% payment clearance before delivery.",
          },
          {
            a: "Is it possible for anybody to delay payment?",
            b: "Delay in payment for certain time period decide by company (Cheque Guarantee is Necessary) and unnecessary delay in payment more then 60 days cause 30% of total bill penalty with clearance of remaining amount.",
          },
          {
            a: "Is it possible company source product for you and its policy?",
            b: "Yes, we are professional in sourcing a product from world wide and with first order company liable to receive 2% of ordered quantity in cash in terms of sourcing and quality assurance fee.",
          },
          {
            a: "How company provide carry facility, import duties and custom clearance?",
            b: "Yes we are proving custom clearance in Pakistan locally from Lahore and Faisalabad. If you want to import anything and wants to know its charges please go to sultan logistics section on website home page and confirm the duties. Once your package arrived client bound to pay complete due pay bills and pick their package from local warehouse.",
          },
        ].map((el, i) => (
          <Box key={i}>
            <h3>
              {i + 1}: {el?.a}
            </h3>
            <p>Answer: {el?.b}</p>
          </Box>
        ))}
      </Container>
    </Layout>
  );
};

export default Index;
