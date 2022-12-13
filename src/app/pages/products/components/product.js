import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { IoExpandOutline } from "react-icons/io5";
import styled from "styled-components";
import Img1 from "../../../assets/image/products/1.png";
import Img2 from "../../../assets/image/products/2.jpg";
import { FcInfo } from "react-icons/fc";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
const Container = styled.div`
  width: 100%;
`;
const Card = styled.div`
  width: 100%;
  max-width: 350px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #eaeff2;
  @media (max-width: 588px) {
    max-width: 100%;
  }
`;
const H1 = styled.h1`
  font-weight: 600;
  font-size: 50px;
  line-height: 63px;
  text-align: left;
  letter-spacing: 2px;
  background: -webkit-linear-gradient(#00a8e6, #28be11);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 576px) {
    font-size: 40px;
    line-height: 53px;
  }
`;
const IMG = styled.img`
  width: 100%;
  object-fit: cover;
  margin: auto;
  display: block;
  border-radius: 12px;
  height: 200px;
`;
const Body = styled.div`
  padding: 0 1rem 1rem 1rem;
`;
const Title = styled.h3`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
  color: #191919;
  margin: 0.4rem 0;
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
const Text = styled.p`
  color: gray;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Category = styled.p`
  margin: 0;
  font-weight: 600;
  color: #00a8e8;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 2rem;
  width: 100%;
`;
const Prev = styled.img`
  border-radius: 9px;
  width: 100%;
  border: 1px solid #ccc;
`;
const Product = ({ category }) => {
  const [show, setShow] = useState(null);
  const [open, setOpen] = useState({ data: {}, show: false });
  const [data, setData] = useState([]);
  const [Loader, setLoader] = useState(false);
  const getDate = (data) => {
    let string = "";
    if (data) {
      let d = data;
      let m = d.toLocaleString("default", { month: "short" });
      let day = d?.getDate();
      let year = d?.getFullYear();
      string = `${m}.${day}.${year}`;
    }
    return string;
  };
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "products", "allProducts"), (doc) => {
      setLoader(true);
      if (category?.toLowerCase()) {
        let dummy = doc
          ?.data()
          ?.data?.filter(
            (el) => el?.category?.toLowerCase() === category?.toLowerCase()
          );
        setData(dummy);
      } else {
        setData(doc?.data()?.data);
      }
      setTimeout(() => {
        setLoader(false);
      }, 1500);
    });
    return () => {
      unSub();
    };
  }, [category]);
  return (
    <Container>
      <Wrapper>
        {Loader ? (
          <Spinner variant="info" size="lg" animation="border" />
        ) : (
          data?.map((el, i) => (
            <Card
              key={i}
              onMouseEnter={() => {
                setShow(i);
              }}
              onMouseLeave={() => {
                setShow(null);
              }}
            >
              <div className="p-3">
                <IMG src={el?.image} />
              </div>
              <Body>
                <Title>{el?.title}</Title>
                <div className="d-flex justify-content-between">
                  <Text>{getDate(el?.date?.toDate())}</Text>
                  <Category>{el?.category}</Category>
                </div>
              </Body>
              <Layer
                show={show === i}
                onClick={() => setOpen({ ...open, show: true, data: el })}
              >
                <IoExpandOutline
                  style={{ color: "white", fontSize: "30px" }}
                  title={"view more"}
                />
              </Layer>
            </Card>
          ))
        )}
      </Wrapper>
      <Modal
        show={open.show}
        onHide={() => setOpen({ ...open, show: false, data: {} })}
        size="lg"
        style={{
          fontFamily: "Comfortaa",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{open?.data?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          <Prev src={open?.data?.image} />

          <div>
            <h3 style={{ color: "#000" }}>
              Description <FcInfo />{" "}
            </h3>
            {open?.data?.content && (
              <div dangerouslySetInnerHTML={{ __html: open?.data?.content }} />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "space-between" }}>
          <Text>{getDate(open?.data?.date?.toDate())}</Text>
          <p>{open?.data?.category}</p>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Product;
