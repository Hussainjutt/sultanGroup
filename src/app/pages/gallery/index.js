import React, { useEffect } from "react";
import { BsArrowUpShort, BsImageFill } from "react-icons/bs";
import DashBoard from "../../adminDashboard";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import Dummy from "../../assets/image/blogs/dummy.jpg";
import { FileUploader } from "react-drag-drop-files";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";

const Container = styled.div`
  padding: 2rem;
`;
const ImagePrev = styled.img`
  width: 100%;
  border-radius: 0.5rem;
  background-color: #0658c2;
`;
const Btn = styled.button`
  color: white;
  border: none;
  background-color: #00a8e8;
  padding: 0.6rem 0.6rem 0.6rem 1rem;
  text-align: left;
  margin: 0 1rem;
  border-radius: 27px;
  position: relative;
  width: 125px;
  font-weight: 600;
  cursor: pointer;
  span {
    background-color: #35c120;
    border-radius: 22px;
    position: absolute;
    font-size: 25px;
    padding: 0 8px 4px 8px;
    top: 0;
    right: 0px;
    color: white;
    cursor: pointer;
  }
  &:hover {
    transition: 0.9s;
    background-color: #35c120;
  }
  &:hover .arrow {
    background-color: #00a8e8;
    transition: 0.9s;
  }
`;
const Header = styled(Modal.Header)`
  align-items: flex-start;
  label {
    width: 90%;
    height: 60px;
  }
`;
const Img = styled.img`
  width: 100%;
  max-width: 300px;
  height: 200px;
  border-radius: 20px;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: center;
  grid-gap: 2rem;
  margin-top: 20px;
  padding: 1rem;
  @media (max-width: 1090px) {
    grid-template-columns: auto auto auto;
  }
  @media (max-width: 768px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 576px) {
    grid-template-columns: auto;
  }
`;
const Gallery = () => {
  const [image, setImage] = useState({ prev: "", file: "" });
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const uploadImage = (file) => {
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
        getDownloadURL(UploadTask.snapshot.ref).then((res) => {
          updateDoc(doc(db, "blogs", "imageGallery"), {
            data: arrayUnion({
              src: res,
              date: Timestamp.now(),
            }),
          })
            .then(() => {
              toast.success("Image Added to gallery successfully");
              setImage({ ...image, file: "", prev: "" });
              setShow(false);
            })
            .catch((err) => {
              toast.error(err.message);
            });
        });
      }
    );
  };
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "blogs", "imageGallery"), (doc) => {
      if (doc.exists()) {
        setData(doc.data().data);
      }
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <DashBoard heading={"Image Gallery"}>
      <Container>
        <div>
          <Btn onClick={() => setShow(true)}>
            Upload{" "}
            <span className="arrow">
              <BsArrowUpShort className="icon" />
            </span>
          </Btn>
        </div>
        <Wrapper>
          {data.map((el, i) => (
            <Img src={el?.src} key={i} />
          ))}
        </Wrapper>
        <Modal show={show} onHide={() => setShow(false)}>
          <Header closeButton>
            <FileUploader
              handleChange={(e) => {
                setImage({ ...image, prev: URL.createObjectURL(e), file: e });
              }}
              name="file"
              types={["JPG", "PNG", "GIF", "SVG"]}
              style={{ width: "92%" }}
            />
          </Header>
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
            <Button variant="danger" onClick={() => setShow(false)}>
              cancel
            </Button>
            <Button
              variant="primary"
              disabled={!image?.file}
              onClick={() => uploadImage(image?.file)}
            >
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </DashBoard>
  );
};

export default Gallery;
