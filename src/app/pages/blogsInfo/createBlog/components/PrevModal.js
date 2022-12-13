import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import React, { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import styled from "styled-components";
import { v4 as uid } from "uuid";
import { db, storage } from "../../../../../firebase";

const Container = styled.div``;
const PrevModal = ({ setPrev, prev, data, setData, image, setImage }) => {
  const ref = useRef();
  const addBlog = async (data) => {
    if (data.image.isUrl) {
      try {
        await updateDoc(doc(db, "blogs", "allBlogs"), {
          data: arrayUnion({
            id: uid(),
            image: data?.image.prev,
            content: data?.content,
            title: data?.title,
            category: data?.category,
            comments: data?.comments,
            date: Timestamp.now(),
          }),
        });
        toast.success(`Blog hase been Published`);
        setData({ ...data, title: "", image: "", content: null, category: "" });
        setImage({ ...image, prev: "", file: "", isUrl: false });
        setPrev(false);
      } catch (error) {
        toast.error(error.message);
        setPrev(false);
      }
    } else {
      let file = data?.image?.file;
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
            updateDoc(doc(db, "blogs", "allBlogs"), {
              data: arrayUnion({
                id: uid,
                image: res,
                content: data?.content,
                title: data?.title,
                category: data?.category,
                comments: data?.comments,
                date: serverTimestamp(),
              }),
            })
              .then(() => {
                toast.success(`Blog hase been Published`);
              })
              .catch((err) => {
                toast.error(err.message);
              });
          });
        }
      );
    }
  };
  return (
    <Modal show={prev} onHide={() => setPrev(false)} size="lg">
      <Modal.Header closeButton>
        <span style={{ fontWeight: "600", fontSize: "18px" }}>Preview</span>
      </Modal.Header>
      <Modal.Body
        style={{
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        <h2>{data?.title}</h2>

        <img
          src={data?.image?.prev}
          width="100%"
          style={{
            maxWidth: "100%",
            display: "block",
            borderRadius: "8px",
            backgroundColor: "#ccc",
            marginBottom: "2rem",
          }}
        />
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => setPrev(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => addBlog(data)}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrevModal;
