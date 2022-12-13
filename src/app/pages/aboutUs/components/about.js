import React from "react";
import styled from "styled-components";
import logo from "../../../assets/icon/main-icon.png";
const Container = styled.div`
  padding: 3rem 6%;
`;
const Box = styled.div`
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.17);
  background-color: #fff;
  padding: 1rem 2rem 2rem 2rem;
  position: relative;
  border-radius: 0.75rem;
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
      <H1>About Us</H1>
      <Box>
        <div className="d-flex justify-content-center mb-3">
          <img
            src={logo}
            width="100%"
            style={{
              borderRadius: "4px 0 0 4px",
              maxWidth: "400px",
            }}
          />
        </div>
        <Text>
          <Text>
            Welcome to Sultan Group ® , your number one source for all things
            Chemicals, Biological Reagents, Seeds, Machines, Medical Equipments,
            Primer and Sequencing. We're dedicated to giving you the very best,
            with a focus on three characteristics, ie: dependability , customer
            service and uniqueness.
          </Text>
          Founded in 2015 by Dr Faheem Azher, FA Traders ® has come a long way
          from its beginnings in a Pakistan, ie: Vehari, Warehouse, Wuhan
          Branch. When Sultan Group first started out, his/her passion for
          passion of founder, ie: helping other parents be more eco-friendly,
          providing the best equipment for his fellow colleagues drove him to
          action, ie: do intense research, quit her day job, and gave him the
          impetus to turn hard work and inspiration into to a booming online
          store as well as Trading in more then 10 countries. We now serve
          customers all over Pakistan, UAE, Bangladesh, Sri-Lanka, Indonesia,
          Malysia, Turkey, Russia, and are thrilled to be a part of the quirky,
          eco-friendly, fair trade wing of the Trendy/Customizable, ie:
          Chemicals, Biological Material, Seeds many more.
          <br />
          We hope you enjoy our products as much as we enjoy offering them to
          you. If you have any questions or comments, please don't hesitate to
          contact us
        </Text>
        <Text>
          <b> Sincerely,</b>
        </Text>
        <Text>Name, CEO: Mr. Atif Sultan</Text>
      </Box>
    </Container>
  );
};

export default About;
