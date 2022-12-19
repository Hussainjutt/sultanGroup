import React from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import { Formik } from "formik";
import * as yup from "yup";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../../../firebase";
import { v4 as uid } from "uuid";

const Container = styled.div`
  padding: 2rem 6%;
  background: linear-gradient(
    335deg,
    rgba(40, 191, 17, 1) 0%,
    rgba(0, 169, 237, 1) 100%
  );
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
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
const Error = styled.small`
  color: red;
  text-shadow: 0px 0px 2px rgba(255, 255, 255, 1);
`;
const ContactForm = () => {
  return (
    <>
      <H1>Conatct Us</H1>
      <Container>
        <Formik
          initialValues={{
            name: "",
            email: "",
            tel: "",
            subject: "",
            message: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              await updateDoc(doc(db, "people", "contactList"), {
                data: arrayUnion({
                  ...values,
                  date: Timestamp.now(),
                  key: uid(),
                }),
              });
              toast.success("Application submitted successfully");
              setTimeout(() => {
                resetForm();
              }, 1000);
            } catch (error) {
              toast.error(error.message);
            }
          }}
          validationSchema={schema}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col className="col-md-6 col-12">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Name"
                    className="d-flex"
                  >
                    <Form.Control
                      type="text"
                      placeholder="jhon"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.name && touched.name && (
                    <Error
                      style={{
                        position: "relative",
                        top: "-3px",
                        fontWeight: "600",
                      }}
                    >
                      {errors.name}
                    </Error>
                  )}
                </Col>
                <Col className="col-md-6 col-12">
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Email Address"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.email && touched.email && (
                    <Error
                      style={{
                        position: "relative",
                        top: "-3px",
                        fontWeight: "600",
                      }}
                    >
                      {errors.email}
                    </Error>
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col className="col-md-6 col-12">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Contact #"
                    // className="mb-3"
                  >
                    <Form.Control
                      type="tel"
                      placeholder="phone #"
                      name="tel"
                      value={values.tel}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.tel && touched.tel && (
                    <Error
                      style={{
                        position: "relative",
                        top: "-3px",
                        fontWeight: "600",
                      }}
                    >
                      {errors.tel}
                    </Error>
                  )}
                </Col>
                <Col className="col-md-6 col-12">
                  <FloatingLabel controlId="floatingPassword" label="Subject">
                    <Form.Control
                      type="text"
                      placeholder="Subject"
                      name="subject"
                      value={values.subject}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  {errors.subject && touched.subject && (
                    <Error
                      style={{
                        position: "relative",
                        top: "-3px",
                        fontWeight: "600",
                      }}
                    >
                      {errors.subject}
                    </Error>
                  )}
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
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                {errors.message && touched.message && (
                  <Error
                    style={{
                      position: "relative",
                      top: "-3px",
                      fontWeight: "600",
                    }}
                  >
                    {errors.message}
                  </Error>
                )}
              </Row>
              <Button
                type="submit"
                variant="dark"
                className="w-25 mx-auto mt-3 d-block"
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
};
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
  tel: yup.string().required("Phone# is required"),
  email: yup.string().email("Not an valid email").required("Email is required"),
});

export default ContactForm;
