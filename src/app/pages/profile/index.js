import React, { useEffect } from "react";
import styled from "styled-components";
import { HiOutlineBuildingOffice2, HiOutlineUserCircle } from "react-icons/hi2";
import { CiLock, CiUnlock } from "react-icons/ci";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, setNestedObjectValues } from "formik";
import Dummy from "../../assets/image/blogs/dummy.jpg";
import * as Yup from "yup";
import Layout from "../../adminDashboard";
import { FaRegAddressCard } from "react-icons/fa";
import {
  MdFlipCameraIos,
  MdOutlineLocationOn,
  MdOutlineMailOutline,
  MdPhoneEnabled,
} from "react-icons/md";
import Select from "react-select";
import { Button, Modal, Spinner } from "react-bootstrap";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { toast } from "react-toastify";
import { FileUploader } from "react-drag-drop-files";
import { BsImageFill } from "react-icons/bs";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
const Container = styled.div`
  margin: 2rem;
  background-color: #fff;
  box-shadow: 0 10px 30px #1329550d;
  border-radius: 10px;
`;
const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem 2rem 0 2rem;
  grid-gap: 1rem;
`;
const Main = styled.div`
  padding: 2rem;
  width: 100%;
`;
const Wrapper = styled.div`
  position: relative;
`;
const TextField = styled.input`
  outline: none;
  border: 1px solid ${(props) => (props.isError ? "red" : "#ccc")};
  width: 100%;
  padding: 0.7rem;
  font-size: 15px;
  border-radius: 4px;
  &::placeholder {
    color: #80809f;
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
const ModalHeader = styled(Modal.Header)`
  align-items: flex-start;
  label {
    width: 90%;
    height: 60px;
  }
`;
const ImagePrev = styled.img`
  width: 100%;
  border-radius: 0.5rem;
  background-color: #ccc;
`;
const CustomBtn = styled.button`
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
  color: #00a8e8;
  background: transparent;
  border: 1px solid #00a8e8;
  font-weight: 600;
  &:hover {
    transition: 0.4s;
    background: #00a8e8;
    color: white;
  }
`;
const BottomText = styled.p`
  text-align: center;
  margin: 0;
`;
const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;
const Box = styled.p`
  margin: 0;
  position: relative;
  background-color: #ccc;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #ccc;
  max-width: 130px;
  height: 130px;
  object-fit: fill;
  display: flex;
  justify-content: center;
  align-items: center;
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
  border-radius: 50%;
`;
const Index = () => {
  const [active, setActive] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);
  const [state, setState] = useState({});
  const [overlay, setOvarlay] = useState(false);
  const [image, setImage] = useState({ prev: "", file: "" });
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const Error = ({ isError, error }) => {
    return isError && <small style={{ color: "red" }}>{error}</small>;
  };
  const ChangeImage = async (file) => {
    setLoader(true);
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
    const UploadTask = uploadBytesResumable(storageRef, file);
    UploadTask.on(
      "state_changed",
      (snapShot) => {
        switch (snapShot.state) {
          case "paused":
            console.warn("paused");
            break;
          case "running":
            console.warn("running");
            break;
        }
      },
      (errors) => {
        toast.error(errors);
      },
      () => {
        deleteObject(ref(storage, `${state?.profileImage}`)).then(() => {
          getDownloadURL(UploadTask.snapshot.ref).then((res) => {
            updateDoc(doc(db, "auth", "admin"), {
              ...state,
              profileImage: res,
            })
              .then(() => {
                toast.success("Updated successfully");
                setImage({ ...image, file: "", prev: "" });
                setLoader(false);
                setModal(false);
              })
              .catch((err) => {
                toast.error(err);
              });
          });
        });
      }
    );
  };
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "auth", "admin"), (doc) => {
      if (doc.exists()) {
        setState(doc.data());
      }
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <Layout heading={"Profile"}>
      <Container>
        <Header>
          <Box
            onMouseEnter={() => setOvarlay(true)}
            onMouseLeave={() => setOvarlay(false)}
          >
            <Img src={state?.profileImage} />
            <Layer
              show={overlay}
              className="d-flex justify-content-center align-items-center"
            >
              <MdFlipCameraIos
                style={{ fontSize: "25px", color: "white", cursor: "pointer" }}
                onClick={() => setModal(true)}
              />
            </Layer>
          </Box>
          <div>
            <h3 className="m-0">Shane Watson</h3>
            <p className="m-0">Admin</p>
          </div>
          <CustomBtn
            type="button"
            style={{ maxWidth: "200px" }}
            onClick={() => setDisable(!disable)}
          >
            Edit Profile
          </CustomBtn>
        </Header>
        <Main>
          <Formik
            initialValues={{
              profileImage: state?.profileImage,
              name: state?.name,
              email: state?.email,
              password: state?.password,
              phone: state?.phone,
              address: state?.address,
              companyName: state?.companyName,
              gender: state?.gender,
            }}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                await updateDoc(doc(db, "auth", "admin"), {
                  ...values,
                });
                toast.success("Updated successfully");
              } catch (err) {
                toast.error(err.message);
              }
            }}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto auto",
                    gridGap: "1rem",
                  }}
                >
                  <Wrapper>
                    <TextField
                      type={"text"}
                      disabled={disable}
                      placeholder="User Name"
                      onFocus={() => setActive(0)}
                      onBlur={() => setActive(null)}
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isError={errors.name && touched.name}
                    />
                    <Icon style={{ color: active === 0 && "#2fb31a" }}>
                      <FaRegAddressCard />
                    </Icon>
                    <Error
                      isError={errors.name && touched.name}
                      error={errors.name}
                    />
                  </Wrapper>
                  <Wrapper>
                    <TextField
                      type={"email"}
                      disabled={disable}
                      placeholder="Email Address"
                      onFocus={() => setActive(1)}
                      onBlur={() => setActive(null)}
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isError={errors.email && touched.email}
                    />
                    <Icon style={{ color: active === 1 && "#2fb31a" }}>
                      <MdOutlineMailOutline />
                    </Icon>
                    <Error
                      isError={errors.email && touched.email}
                      error={errors.email}
                    />
                  </Wrapper>
                  <Wrapper>
                    <TextField
                      type={show ? "text" : "password"}
                      disabled={disable}
                      placeholder="Password"
                      onFocus={() => setActive(4)}
                      onBlur={() => setActive(null)}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isError={errors.password && touched.password}
                    />
                    <Icon
                      style={{
                        color: active === 4 && "#2fb31a",
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
                  <Wrapper>
                    <TextField
                      type={"tel"}
                      disabled={disable}
                      placeholder="Phone"
                      onFocus={() => setActive(3)}
                      onBlur={() => setActive(null)}
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      isError={errors.phone && touched.phone}
                    />
                    <Icon style={{ color: active === 3 && "#2fb31a" }}>
                      <MdPhoneEnabled />
                    </Icon>
                    <Error
                      isError={errors.email && touched.email}
                      error={errors.email}
                    />
                  </Wrapper>
                  <Wrapper>
                    <TextField
                      type={"text"}
                      disabled={disable}
                      placeholder="Address"
                      onFocus={() => setActive(5)}
                      onBlur={() => setActive(null)}
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      isError={errors.address && touched.address}
                    />
                    <Icon
                      style={{
                        color: active === 5 && "#2fb31a",
                      }}
                    >
                      <MdOutlineLocationOn />
                    </Icon>
                    <Error
                      isError={errors.address && touched.address}
                      error={errors.address}
                    />
                  </Wrapper>
                  <Wrapper>
                    <TextField
                      type={"text"}
                      disabled={disable}
                      placeholder="Company Name"
                      onFocus={() => setActive(6)}
                      onBlur={() => setActive(null)}
                      name="companyName"
                      value={values.companyName}
                      onChange={handleChange}
                      isError={errors.companyName && touched.companyName}
                    />
                    <Icon style={{ color: active === 6 && "#2fb31a" }}>
                      <HiOutlineBuildingOffice2 />
                    </Icon>
                    <Error
                      isError={errors.companyName && touched.companyName}
                      error={errors.companyName}
                    />
                  </Wrapper>
                  <Wrapper>
                    <Select
                      placeholder="Gender"
                      isDisabled={disable}
                      options={[
                        { label: "Male", value: "Male" },
                        { label: "Female", value: "Female" },
                      ]}
                      value={
                        values.gender && {
                          label: values.gender,
                          value: values.gender,
                        }
                      }
                      isClearable={true}
                      onChange={(e) => {
                        setFieldValue("gender", e.value);
                      }}
                    />
                    <Error
                      isError={errors.gender && touched.gender}
                      error={errors.gender}
                    />
                  </Wrapper>
                </div>
                <Button
                  variant="dark"
                  type="submit"
                  className="px-3 py-2 mt-4 d-block"
                >
                  Update Profile
                </Button>
              </form>
            )}
          </Formik>
        </Main>
        <Modal show={modal} onHide={() => setModal(false)}>
          <ModalHeader closeButton>
            <FileUploader
              handleChange={(e) => {
                setImage({ ...image, prev: URL.createObjectURL(e), file: e });
              }}
              name="profileImage"
              types={["JPG", "PNG", "GIF", "SVG"]}
              style={{ width: "92%" }}
            />
          </ModalHeader>
          <Modal.Body style={{ position: "relative" }}>
            <ImagePrev src={image.prev ? image.prev : Dummy} />
            {image.file && image.prev && (
              <>
                <p className="p-2 m-0 d-flex align-items-center gap-3">
                  <BsImageFill />
                  <span
                    style={{
                      maxWidth: "80%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                    }}
                  >
                    {image.file?.name}
                  </span>
                </p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => setShow(false)}
              disabled={loader}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={!image.file || loader}
              onClick={() => {
                ChangeImage(image.file);
              }}
            >
              {loader ? <Spinner size="sm" variant="dark" /> : "Upload"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Layout>
  );
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Not an valid email").required("Eamil is required"),
  password: Yup.string().required("Password is required"),
});
export default Index;
