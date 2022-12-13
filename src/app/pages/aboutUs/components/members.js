import React from "react";
import styled from "styled-components";
import Img1 from "../../../assets/image/members/1.jpeg";
import Img2 from "../../../assets/image/members/2.jpeg";
import Img3 from "../../../assets/image/members/3.png";
import Img4 from "../../../assets/image/members/4.jpeg";
import Img5 from "../../../assets/image/members/5.png";
import Img6 from "../../../assets/image/members/6.jpeg";
import Img7 from "../../../assets/image/members/7.jpeg";
import Img8 from "../../../assets/image/members/8.jpeg";
import Img9 from "../../../assets/image/members/9.jpeg";
import Img10 from "../../../assets/image/members/10.jpeg";
import { HiLanguage } from "react-icons/hi2";
import { SiSlashdot } from "react-icons/si";
const Container = styled.div`
  padding: 3rem 6%;
`;
const Card = styled.div`
  width: 100%;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.17);
  border-radius: 0.75rem;
  padding: 1.5rem;
  background-color: #fff;
`;
const H1 = styled.h1`
  font-weight: 600;
  font-size: 50px;
  line-height: 63px;
  text-align: center;
  letter-spacing: 2px;
  margin-bottom: 2rem;
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
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  grid-gap: 2.5rem;
`;
const Languages = styled.span`
  &::after {
    content: ",";
    margin: 0 2px;
  }
  &:last-child {
    &::after {
      content: "";
    }
  }
`;
const Members = () => {
  const data = [
    {
      img: Img1,
      title: "Department Head of Machines and Medical Equipments",
      name: "Mr. Jack Liu",
      languages: ["English", "Chinese"],
    },
    {
      img: Img2,
      title:
        "Department Head of Chemical, Biological reagents and Molecular biology services",
      name: "Mr Li Lincheng",
      languages: ["Chinese", "Urdu"],
    },
    {
      img: Img3,
      title: "Department Head of Seed & Agricultural Machinery",
      name: "Mr. Xu Zhiyong",
      languages: ["English", "Chinese", "Urdu"],
    },
    {
      img: Img4,
      title:
        "Department Head of Textile, Weaving and Bioler Engineering services",
      name: "Mr Rana Tanveer",
      languages: ["English", "Urdu", "Hindi"],
    },
    {
      img: Img5,
      title: "Department Head of Genetics, Genomics and Sequencing",
      name: "Dr. Chunjie Huang (Ph.D.)",
      languages: ["English", "Chinese"],
    },
    {
      img: Img6,
      title: "External Expert in Sequencing, Meta genomics and GWAS",
      name: "Dr. Faheem Ahmed Khan (Ph.D.)",
      languages: ["English", "Chinese", "Indonesian"],
    },
    {
      img: Img7,
      title: "External Expert in Microbiology and Diagnostics",
      name: "Dr. Sanaullah Sajid (Ph.D.)",
      languages: ["English", "Urdu"],
    },
    {
      img: Img8,
      title: "Logistic & Freight Handler Zonal Manager District Sahiwal",
      name: "Mr. Sami Sajid",
      languages: ["English", "Urdu"],
    },
    {
      img: Img9,
      title:
        "Logistic & Freight Handler Technical Zonal Manager Multan Division",
      name: "Dr. Awaise karni (Ph.D.)",
      languages: ["English", "Urdu"],
    },
    {
      img: Img10,
      title: "CEO Zokeyo UK Limited",
      name: "Qadeer Ul Hassan Bajwa",
      languages: ["English", "Urdu"],
    },
  ];

  return (
    <Container>
      <H1>OUR TEAM MEMBERS</H1>
      <Wrapper>
        {data?.map((el, i) => (
          <Card key={i}>
            <img
              src={el?.img}
              height="350px"
              style={{
                width: "100%",
                objectFit: "cover",
                margin: "auto",
                display: "block",
                borderRadius: ".75rem",
                overflow: "hidden",
              }}
            />
            <div className="pt-3">
              <h3
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                title={el?.title}
              >
                {el?.title}
              </h3>
              <p className="m-1"> {el?.name}</p>
              <p className="m-0">
                <HiLanguage style={{ fontSize: "24px", color: "#29A816" }} />
                <SiSlashdot style={{ fontSize: "15px", color: "#04A2DC" }} />
                {el?.languages?.map((ele, i) => (
                  <Languages key={i}>{ele}</Languages>
                ))}
              </p>
            </div>
          </Card>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Members;
