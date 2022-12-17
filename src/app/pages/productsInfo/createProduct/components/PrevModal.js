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
  editor,
  setContent,
}) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const addProd = async (data) => {
    try {
      let q = await getDoc(doc(db, "products", "allProducts"));
      q = q
        .data()
        .data.filter(
          (el) => el.title.toLowerCase() === data?.title.toLowerCase()
        );
      if (q.length === 0) {
        if (data.image.isUrl) {
          setLoader(true);
          await updateDoc(doc(db, "products", "allProducts"), {
            data: arrayUnion({
              id: uid(),
              image: data?.image?.prev,
              content: data?.content,
              title: data?.title,
              category: data?.category,
              date: Timestamp.now(),
              isDraft: data?.isDraft,
              quots: data?.quots,
            }),
          });
          toast.success(
            data?.isDraft
              ? "Product is saved to draft successfully"
              : "Product is published successfully"
          );
          setData({
            title: "",
            image: "",
            content: null,
            category: "",
            quots: [],
            isDraft: null,
          });
          setContent("");
          setImage({ ...image, prev: "", file: "", isUrl: false });
          editor?.setContent("");
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
              getDownloadURL(UploadTask.snapshot.ref).then((res) => {
                updateDoc(doc(db, "blogs", "imageGallery"), {
                  data: arrayUnion({
                    src: res,
                    date: Timestamp.now(),
                  }),
                }).then(() => {
                  updateDoc(doc(db, "products", "allProducts"), {
                    data: arrayUnion({
                      id: uid(),
                      image: res,
                      content: data?.content,
                      title: data?.title,
                      category: data?.category,
                      date: Timestamp.now(),
                      isDraft: data?.isDraft,
                      quots: data?.quots,
                    }),
                  }).then(() => {
                    toast.success(
                      data?.isDraft
                        ? "Product is saved to draft successfully"
                        : "Product is published successfully"
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
                    editor?.setContent("");
                    setLoader(false);
                    setPrev(false);
                  });
                });
              });
            }
          );
        }
      } else {
        toast.error("Product already exists please use another product name");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const updateProd = async () => {
    function removeObjectWithId(arr, id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
      arr.splice(objWithIdIndex, 1);
      return arr;
    }
    try {
      let q = await getDoc(doc(db, "products", "allProducts"));
      q = q
        .data()
        .data.filter(
          (el) => el.title.toLowerCase() === data?.title.toLowerCase()
        );
      if (q.length === 0) {
        if (data.image.isUrl) {
          setLoader(true);
          let arr = await getDoc(doc(db, "products", "allProducts"));
          let newData = removeObjectWithId(arr.data().data, isUpdate);
          newData.push({
            category: data?.category,
            quots: data?.quots,
            content: data?.content,
            date: Timestamp.now(),
            id: isUpdate,
            image: data?.image?.prev,
            title: data.title,
            isDraft: data.isDraft,
          });
          await updateDoc(doc(db, "products", "allProducts"), {
            data: [...newData],
          });
          setLoader(false);
          toast.success("Product is updated successfully");
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
              getDownloadURL(UploadTask.snapshot.ref).then((res) => {
                updateDoc(doc(db, "blogs", "imageGallery"), {
                  data: arrayUnion({
                    src: res,
                    date: Timestamp.now(),
                  }),
                }).then(async () => {
                  let arr = await getDoc(doc(db, "products", "allProducts"));
                  let newData = removeObjectWithId(arr.data().data, isUpdate);
                  newData.push({
                    category: data?.category,
                    quots: data?.quots,
                    content: data?.content,
                    date: Timestamp.now(),
                    id: isUpdate,
                    image: data?.image?.prev,
                    title: data.title,
                    isDraft: data.isDraft,
                  });
                  await updateDoc(doc(db, "products", "allProducts"), {
                    data: [...newData],
                  });
                  setLoader(false);
                  toast.success("Product is updated successfully");
                  setPrev(false);
                });
              });
            }
          );
        }
      } else {
        toast.error("Product already exists please use another product name");
      }
    } catch (error) {
      toast.error(error.message);
      setPrev(false);
    }
  };
  return (
    <Modal
      show={prev}
      onHide={() => {
        !loader && setPrev(false);
      }}
      size="lg"
    >
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
              updateProd(data);
            } else {
              addProd(data);
            }
          }}
          disabled={loader}
        >
          {loader ? (
            <>
              <Spinner variant="dark" animation="border" size="sm" />
              &nbsp;Wait
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
