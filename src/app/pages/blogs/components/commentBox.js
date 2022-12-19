import { Formik } from "formik";
import React, { useState } from "react";
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import styled from "styled-components";
import * as yup from "yup";
import {
  arrayUnion,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { v4 as uid } from "uuid";

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
const Error = styled.small`
  color: red;
`;
const CommentBox = ({ id }) => {
  const [loader, setLoader] = useState(false);
  return (
    <Container>
      <H1>Leave a Comment</H1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          comment: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          if (id) {
            setLoader(true);
            try {
              let data = await getDoc(doc(db, "blogs", "allBlogs"));
              let i = data.data().data.findIndex((el) => {
                return el.id === id;
              });
              let Data = data.data().data.filter((el) => el.id !== id);
              Data.splice(i, 0, {
                ...data.data().data[i],
                comments: [
                  ...data.data().data[i].comments,
                  {
                    id: uid(),
                    date: Timestamp.now(),
                    ...values,
                  },
                ],
              });
              await updateDoc(doc(db, "blogs", "allBlogs"), {
                data: [...Data],
              });
              toast.success("Successfully sent");
              setTimeout(() => {
                setLoader(false);
                resetForm();
              }, 1000);
            } catch (error) {
              toast.error(error.message);
              setLoader(false);
            }
          }
        }}
        validationSchema={schema}
      >
        {({ handleChange, handleSubmit, values, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Write Comment"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                style={{ resize: "none", height: "130px" }}
                placeholder="name@example.com"
                value={values.comment}
                onChange={handleChange}
                name="comment"
              />
              {errors.comment && touched.comment && (
                <Error>{errors.comment}</Error>
              )}
            </FloatingLabel>
            <Row className="mb-4">
              <Col className="col-12 col-sm-6">
                <FloatingLabel controlId="floatingInput" label="Name">
                  <Form.Control
                    type="text"
                    placeholder="name@example.com"
                    value={values.name}
                    onChange={handleChange}
                    name="name"
                  />
                  {errors.name && touched.name && <Error>{errors.name}</Error>}
                </FloatingLabel>
              </Col>
              <Col className="col-12 col-sm-6">
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Email address"
                >
                  <Form.Control
                    type="email"
                    placeholder="email"
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                  />
                  {errors.email && touched.email && (
                    <Error>{errors.email}</Error>
                  )}
                </FloatingLabel>
              </Col>
            </Row>
            <Button variant="dark w-50" type="submit" disabled={loader}>
              {loader ? (
                <>
                  <Spinner variant={"light"} animation="border" size="sm" />{" "}
                  Sending
                </>
              ) : (
                "Send"
              )}
            </Button>
          </form>
        )}
      </Formik>
    </Container>
  );
};
const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Not an valid email"),
  name: yup.string().required("Name is required"),
  comment: yup.string().required("Comment is required"),
});
export default CommentBox;
