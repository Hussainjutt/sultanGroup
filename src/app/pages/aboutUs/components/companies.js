import React from "react";
import styled from "styled-components";
import Img1 from "../../../assets/icon/aboutus/logo-1.png";
import Img2 from "../../../assets/icon/aboutus/logo-2.png";
import Img3 from "../../../assets/icon/aboutus/logo-3.png";
import Img4 from "../../../assets/icon/aboutus/logo-4.png";
import Img5 from "../../../assets/icon/aboutus/logo-5.png";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
  background: black;
  padding: 1rem 0;
  grid-gap: 1rem;
`;
const Companies = () => {
  return (
    <Container>
      {[Img1, Img2, Img3, Img4, Img5].map((el, i) => (
        <img src={el} width="140px" />
      ))}
    </Container>
  );
};

export default Companies;
