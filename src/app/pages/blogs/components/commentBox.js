import React from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import styled from "styled-components";

const Container = styled.div`
  background-color: #fff;
  margin: 2rem 0;
  padding: 2rem;
  box-shadow: 0px 0px 16px 6px rgba(204, 204, 204, 0.75);
  border-radius: 0.75rem;
  max-width: 800px;
  @media (max-width: 924px) {
    max-width: 100%;
  }
`;
const H1 = styled.h1`
  font-weight: 600;
  font-size: 35px;
  line-height: 43px;
  text-align: left;
  background: -webkit-linear-gradient(#00a8e6, #28be11);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 576px) {
    font-size: 40px;
    line-height: 53px;
  }
`;
const CommentBox = () => {
  return (
    <Container>
      <H1>Leave a Comment</H1>
      <FloatingLabel
        controlId="floatingInput"
        label="Write Comment"
        className="mb-3"
      >
        <Form.Control
          as="textarea"
          style={{ resize: "none", height: "130px" }}
          placeholder="name@example.com"
        />
      </FloatingLabel>
      <Row className="mb-4">
        <Col className="col-12 col-sm-6">
          <FloatingLabel controlId="floatingInput" label="Name">
            <Form.Control type="text" placeholder="name@example.com" />
          </FloatingLabel>
        </Col>
        <Col className="col-12 col-sm-6">
          <FloatingLabel controlId="floatingPassword" label="Email address">
            <Form.Control type="email" placeholder="Password" />
          </FloatingLabel>
        </Col>
      </Row>
      <Button variant="dark w-50">Submit</Button>
    </Container>
  );
};

export default CommentBox;
