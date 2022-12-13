import React from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import Bg from "../../../assets/image/backgrounds/contact.jpg";

const Coantainer = styled.div`
  padding: 2rem 6%;
  background: url(${`https://img.freepik.com/free-photo/colleagues-working-together-call-center-with-headphones_23-2149256084.jpg?w=740&t=st=1670065166~exp=1670065766~hmac=a3ede4836f611a5606ccb11245be2225b88c12d46ef85f5fd4aa8c375aaea09e`});
  background-size: cover;
  background-attachment: fixed;
`;
const H1 = styled.h1`
  font-weight: 600;
  font-size: 50px;
  line-height: 63px;
  text-align: center;
  letter-spacing: 2px;
  padding: 0 6%;
  margin: 2rem 0;
  background: -webkit-linear-gradient(#00a8e6, #28be11);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 576px) {
    font-size: 40px;
    line-height: 53px;
  }
`;
const ContactForm = () => {
  return (
    <>
      <H1>Conatct Us</H1>
      <Coantainer>
        <Row className="mb-3">
          <Col className="col-md-6 col-12">
            <FloatingLabel
              controlId="floatingInput"
              label="Name"
              className="mb-3 d-flex"
            >
              <Form.Control type="text" placeholder="jhon" />
            </FloatingLabel>
          </Col>
          <Col className="col-md-6 col-12">
            <FloatingLabel controlId="floatingPassword" label="Email Address">
              <Form.Control type="email" placeholder="Email Address" />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="col-md-6 col-12">
            <FloatingLabel
              controlId="floatingInput"
              label="Contact #"
              className="mb-3"
            >
              <Form.Control type="tel" placeholder="phone #" />
            </FloatingLabel>
          </Col>
          <Col className="col-md-6 col-12">
            <FloatingLabel controlId="floatingPassword" label="Subject">
              <Form.Control type="text" placeholder="Subject" />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <FloatingLabel
            controlId="floatingTextarea"
            className="Comment-box"
            label="Message"
          >
            <Form.Control
              as="textarea"
              style={{ height: "100px", resize: "none" }}
              placeholder="Leave a comment here"
            />
          </FloatingLabel>
        </Row>
        <Button variant="dark" className="w-25 mx-auto mt-3 d-block">
          Submit
        </Button>
      </Coantainer>
    </>
  );
};

export default ContactForm;
