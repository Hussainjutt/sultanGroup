import React, { useRef } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import styled from "styled-components";
import { v4 as uid } from "uuid";
import { db, storage } from "../../../../../firebase";
import { useNavigate } from "react-router-dom";

const Container = styled.div``;
const PrevModal = ({
  setPrev,
  prev,
  data,
  setData,
  image,
  setImage,
  isUpdate,
}) => {
  const navigate = useNavigate();
  const addBlog = async (data) => {
    let src;
    if (data.image.isUrl) {
      src = data?.image?.prev;
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
            src = res;
          });
        }
      );
    }
    try {
      await updateDoc(doc(db, "blogs", "allBlogs"), {
        data: arrayUnion({
          id: uid(),
          image: src,
          content: data?.content,
          title: data?.title,
          category: data?.category,
          date: Timestamp.now(),
          isDraft: data?.isDraft,
          comments: data?.comments,
        }),
      });
      toast.success(
        data?.isDraft
          ? "Blog is saved to draft successfully"
          : "Blog is published successfully"
      );
      setData({
        ...data,
        title: "",
        image: "",
        content: null,
        category: "",
        isDraft: null,
      });
      setImage({ ...image, prev: "", file: "", isUrl: false });
      setPrev(false);
    } catch (err) {
      toast.error(err.message);
    }
  };
  const updateBlog = async () => {
    function removeObjectWithId(arr, id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
      arr.splice(objWithIdIndex, 1);
      return arr;
    }
    let src;
    if (data.image.isUrl) {
      src = data?.image?.prev;
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
            src = res;
          });
        }
      );
    }
    try {
      let arr = await getDoc(doc(db, "blogs", "allBlogs"));
      let newData = removeObjectWithId(arr.data().data, isUpdate);
      newData.push({
        category: data?.category,
        comments: data?.comments,
        content: data?.content,
        date: Timestamp.now(),
        id: isUpdate,
        image: src,
        title: data.title,
        isDraft: data.isDraft,
      });
      await updateDoc(doc(db, "blogs", "allBlogs"), {
        data: [...newData],
      });
      toast.success("Blog is updated successfully");
      setPrev(false);
    } catch (error) {
      toast.error(error.message);
      setPrev(false);
    }
  };
  return (
    <Modal show={prev} onHide={() => setPrev(false)} size="lg">
      <Modal.Header closeButton>
        <span style={{ fontWeight: "600", fontSize: "18px" }}>Preview</span>
      </Modal.Header>
      <Modal.Body
        style={{
          maxHeight: "400px",
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
        <Button
          variant="primary"
          onClick={() => {
            if (isUpdate) {
              updateBlog(data);
            } else {
              addBlog(data);
            }
          }}
        >
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrevModal;
