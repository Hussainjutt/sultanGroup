import React from "react";
import styled from "styled-components";
import Logo from "../../../assets/icon/main-icon.png";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { CiLock, CiUnlock } from "react-icons/ci";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { db } from "../../../../firebase";
import { doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { toast } from "react-toastify";
const Container = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  alogn-items: center;
  min-height: 100vh;
`;
const Main = styled.div`
  width: 100%;
  max-width: 560px;
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px #1329550d;
  align-self: center;
`;
const Wrapper = styled.div`
  padding: 0 0.5rem;
  position: relative;
`;
const TextField = styled.input`
  outline: none;
  border: 1px solid ${(props) => (props.isError ? "red" : "#eff0f2")};
  width: 100%;
  padding: 0.7rem;
  font-size: 15px;
  border-radius: 4px;
  &::placeholder {
    color: #ccc;
  }
  &:focus {
    border: 1px solid #169acf;
  }
`;
const Icon = styled.span`
  position: absolute;
  right: 1rem;
  top: -1px;
  font-size: 26px;
  color: gray;
`;
const MutedText = styled.span`
  display: inline-block;
  margin: 0;
  color: #169acf;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    color: #2fb31a;
  }
`;
const Button = styled.button`
  display: block;
  width: 100%;
  font-size: 17px;
  outline: none;
  border: none;
  padding: 9px;
  border-radius: 6px;
  color: white;
  font-family: "Comfortaa";
  position: relative;
  background: linear-gradient(11deg, #26bf0e, #0aa3dc);
  font-weight: 600;
  z-index: 1;
  &::before {
    position: absolute;
    border-radius: 6px;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(230deg, #26bf0e, #0aa3dc);
    z-index: -1;
    transition: opacity 0.5s linear;
    opacity: 0;
  }
  &:hover::before {
    opacity: 1;
  }
`;
const BottomText = styled.p`
  text-align: center;
  margin: 0;
`;
const Index = () => {
  const [active, setActive] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const Error = ({ isError, error }) => {
    return isError && <small style={{ color: "red" }}>{error}</small>;
  };
  return (
    <Container>
      <Main>
        <img src={Logo} width="250px" className="mx-auto d-block mb-5" />
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const docSnap = await getDoc(doc(db, "auth", "admin"));
            if (docSnap.exists()) {
              if (
                values.email === docSnap.data()?.email &&
                values.password === docSnap.data()?.password
              ) {
                localStorage.setItem("isAdmin", true);
                toast.success("LogIn successfully");
                navigate("/profile");
              } else {
                toast.error("Wrong email or password");
              }
            }
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <Wrapper
                className={errors.email && touched.email ? "mt-2 mb-1" : "my-4"}
              >
                <TextField
                  type={"text"}
                  placeholder="Email Address"
                  onFocus={() => setActive(0)}
                  onBlur={() => setActive(null)}
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isError={errors.email && touched.email}
                />
                <Icon style={{ color: active === 0 && "#2fb31a" }}>
                  <HiOutlineUserCircle />
                </Icon>
                <Error
                  isError={errors.email && touched.email}
                  error={errors.email}
                />
              </Wrapper>
              <Wrapper>
                <TextField
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  onFocus={() => setActive(1)}
                  onBlur={() => setActive(null)}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isError={errors.password && touched.password}
                />
                <Icon
                  style={{
                    color: active === 1 && "#2fb31a",
                    cursor: "pointer",
                  }}
                  onClick={() => setShow(!show)}
                >
                  {show ? <CiUnlock /> : <CiLock />}
                </Icon>
                <Error
                  isError={errors.password && touched.password}
                  error={errors.password}
                />
              </Wrapper>
              <MutedText>Forgot Password ?</MutedText>
              <div className="px-2">
                <Button className="my-3" type="submit">
                  Log In
                </Button>
              </div>
            </form>
          )}
        </Formik>
        <BottomText>
          Not have an account , <MutedText className="p-0">Register</MutedText>{" "}
          now
        </BottomText>
      </Main>
    </Container>
  );
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Not an valid email").required("Eamil is required"),
  password: Yup.string().required("Password is required"),
});
export default Index;
