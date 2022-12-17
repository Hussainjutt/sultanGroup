import React, { useRef, useState } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button, Modal, Spinner } from "react-bootstrap";
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
  setContent,
}) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const addBlog = async (data) => {
    try {
      let q = await getDoc(doc(db, "blogs", "allBlogs"));
      q = q
        .data()
        .data.filter(
          (el) => el.title.toLowerCase() === data?.title.toLowerCase()
        );
      if (q?.length === 0) {
        if (data.image.isUrl) {
          setLoader(true);
          await updateDoc(doc(db, "blogs", "allBlogs"), {
            data: arrayUnion({
              id: uid(),
              image: data?.image?.prev,
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
          setContent("");
          setImage({ ...image, prev: "", file: "", isUrl: false });
          setPrev(false);
          setLoader(false);
        } else {
          setLoader(true);
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
              getDownloadURL(UploadTask.snapshot.ref).then(async (res) => {
                await updateDoc(doc(db, "blogs", "imageGallery"), {
                  data: arrayUnion({
                    date: Timestamp.now(),
                    src: res,
                  }),
                });
                await updateDoc(doc(db, "blogs", "allBlogs"), {
                  data: arrayUnion({
                    id: uid(),
                    image: res,
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
                setContent("");
                setImage({ ...image, prev: "", file: "", isUrl: false });
                setLoader(false);
                setPrev(false);
              });
            }
          );
        }
      } else {
        toast.error("Blog already exists please use another title");
      }
    } catch (err) {
      toast.error(err.message);
      setLoader(false);
    }
  };
  const updateBlog = async () => {
    function removeObjectWithId(arr, id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
      arr.splice(objWithIdIndex, 1);
      return arr;
    }
    try {
      let q = await getDoc(doc(db, "blogs", "allBlogs"));
      q = q
        .data()
        .data.filter(
          (el) => el.title.toLowerCase() === data?.title.toLowerCase()
        );
      if (q?.length === 0) {
        if (data.image.isUrl) {
          setLoader(true);
          let arr = await getDoc(doc(db, "blogs", "allBlogs"));
          let newData = removeObjectWithId(arr.data().data, isUpdate);
          newData.push({
            category: data?.category,
            comments: data?.comments,
            content: data?.content,
            date: Timestamp.now(),
            id: isUpdate,
            image: data?.image?.prev,
            title: data.title,
            isDraft: data.isDraft,
          });
          await updateDoc(doc(db, "blogs", "allBlogs"), {
            data: [...newData],
          });
          toast.success("Blog is updated successfully");
          setLoader(false);
          setPrev(false);
        } else {
          setLoader(true);
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
              getDownloadURL(UploadTask.snapshot.ref).then(async (res) => {
                let arr = await getDoc(doc(db, "blogs", "allBlogs"));
                let newData = removeObjectWithId(arr.data().data, isUpdate);
                newData.push({
                  category: data?.category,
                  comments: data?.comments,
                  content: data?.content,
                  date: Timestamp.now(),
                  id: isUpdate,
                  image: res,
                  title: data.title,
                  isDraft: data.isDraft,
                });
                await updateDoc(doc(db, "blogs", "allBlogs"), {
                  data: [...newData],
                });
                toast.success("Blog is updated successfully");
                setLoader(false);
                setPrev(false);
              });
            }
          );
        }
      } else {
        toast.error("Blog already exists please use another title");
      }
    } catch (error) {
      toast.error(error.message);
      setPrev(false);
      setLoader(false);
    }
  };
  return (
    <Modal show={prev} onHide={() => !loader && setPrev(false)} size="lg">
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
        <Button
          variant="danger"
          onClick={() => setPrev(false)}
          disabled={loader}
        >
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
          disabled={loader}
        >
          {loader ? (
            <>
              <Spinner variant="dark" animation="border" size="sm" />
              &nbsp;wait
            </>
          ) : isUpdate ? (
            "Update"
          ) : (
            "Upload"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrevModal;
