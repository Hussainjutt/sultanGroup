import React, { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import ReactSelect from "react-select";
import Options from "./countries";
import { Formik } from "formik";
import * as yup from "yup";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { v4 as uid } from "uuid";
import { toast } from "react-toastify";
const QuotePopUp = ({ open, setOpen }) => {
  const [vals, setVals] = useState([]);
  const [loader, setLoader] = useState(false);

  const Error = ({ err, msg }) => {
    return err && <small className="text-danger p-0">{msg}</small>;
  };
  useEffect(() => {
    if (Options) {
      let arr = [];
      for (let i = 0; i < Options.length; i++) {
        arr.push({ label: Options[i].name, value: Options[i].name });
      }
      setVals(arr);
    } else {
      setVals([]);
    }
  }, [Options]);
  return (
    <Modal
      show={open.is}
      onHide={() => !loader && setOpen({ ...open, id: "", is: false })}
      style={{ background: "rgba(7, 7, 7, 0.5)" }}
    >
      <Modal.Header>
        <Modal.Title>
          <h2 className="m-0" style={{ fontWeight: "600" }}>
            {"Get A Quote"}
          </h2>
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          tel: "",
          address: "",
          country: "",
          message: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          const id = open?.id;
          if (id) {
            setLoader(true);
            try {
              let data = await getDoc(doc(db, "products", "allProducts"));
              let i = data.data().data.findIndex((el) => {
                return el.id === id;
              });
              let Data = data.data().data.filter((el) => el.id !== id);
              Data.splice(i, 0, {
                ...data.data().data[i],
                quots: [
                  ...data.data().data[i].quots,
                  {
                    id: uid(),
                    date: Timestamp.now(),
                    ...values,
                  },
                ],
              });
              await updateDoc(doc(db, "products", "allProducts"), {
                data: [...Data],
              });
              console.log("Data", Data);
              toast.success("Successfully Submitted");
              setTimeout(() => {
                setLoader(false);
                resetForm();
                setOpen({ ...open, id: "", is: false });
              }, 1000);
            } catch (error) {
              toast.error(error.message);
              setLoader(false);
            }
          }
        }}
        validationSchema={schema}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    onChange={handleChange}
                    value={values.first_name}
                    name="first_name"
                  />
                  <Error
                    err={errors.first_name && touched.first_name}
                    msg={errors.first_name}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    onChange={handleChange}
                    value={values.last_name}
                    name="last_name"
                  />
                  <Error
                    err={errors.last_name && touched.last_name}
                    msg={errors.last_name}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                  />
                  <Error
                    err={errors.email && touched.email}
                    msg={errors.email}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="tel"
                    placeholder="Contact #"
                    onChange={handleChange}
                    value={values.tel}
                    name="tel"
                  />
                  <Error err={errors.tel && touched.tel} msg={errors.tel} />
                </Col>
              </Row>
              <Row style={{ padding: "0 12px" }} className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Address"
                  onChange={handleChange}
                  value={values.address}
                  name="address"
                />
                <Error
                  err={errors.address && touched.address}
                  msg={errors.address}
                />
              </Row>
              <div className="w-100 mb-3">
                <ReactSelect
                  placeholder="Country"
                  options={vals}
                  onChange={(e) => {
                    setFieldValue("country", e.label);
                  }}
                />
                <Error
                  err={errors.country && touched.country}
                  msg={errors.country}
                />
              </div>
              <Row style={{ padding: "0 12px" }}>
                <Form.Control
                  as="textArea"
                  style={{ resize: "none" }}
                  placeholder="Message"
                  onChange={handleChange}
                  name="message"
                  value={values.message}
                />
                <Error
                  err={errors.message && touched.message}
                  msg={errors.message}
                />
              </Row>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <Button variant="dark" type="button" disabled={loader}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={loader}>
                {loader ? (
                  <>
                    <Spinner variant={"light"} animation="border" size="sm" />{" "}
                    Wait
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Formik>
    </Modal>
  );
};
const schema = yup.object().shape({
  first_name: yup.string().required("First name is require"),
  last_name: yup.string().required("Last name is require"),
  email: yup.string().required("email is require").email("Not a valid email"),
  tel: yup
    .string()
    .required("Contact # is require")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Contact # is not valid"
    ),
  address: yup.string().required("Addess is require"),
  country: yup.string().required("Country is require"),
  message: yup.string().required("Message is require"),
});
export default QuotePopUp;
