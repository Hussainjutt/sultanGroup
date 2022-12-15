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
  isDraft,
  setDraft,
}) => {
  const navigate = useNavigate();
  const addProduct = async (data) => {
    if (data.image.isUrl) {
      try {
        await updateDoc(
          doc(db, "products", isDraft ? "draft" : "allProducts"),
          {
            data: arrayUnion({
              id: uid(),
              image: data?.image.prev,
              content: data?.content,
              title: data?.title,
              category: data?.category,
              date: Timestamp.now(),
            }),
          }
        );
        toast.success(`Product hase been Published`);
        setData({ ...data, title: "", image: "", content: null, category: "" });
        setImage({ ...image, prev: "", file: "", isUrl: false });
        setDraft(false);
        setPrev(false);
        navigate("/all-products");
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
            updateDoc(doc(db, "products", isDraft ? "draft" : "allProducts"), {
              data: arrayUnion({
                id: uid,
                image: res,
                content: data?.content,
                title: data?.title,
                category: data?.category,
                date: serverTimestamp(),
              }),
            })
              .then(() => {
                setData({
                  ...data,
                  title: "",
                  image: "",
                  content: null,
                  category: "",
                });
                setImage({ ...image, prev: "", file: "", isUrl: false });
                toast.success(`Product hase been Published`);
                setDraft(false);
                navigate("/all-products");
              })
              .catch((err) => {
                toast.error(err.message);
              });
          });
        }
      );
    }
  };
  const updateProduct = async (data) => {
    function removeObjectWithId(arr, id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
      arr.splice(objWithIdIndex, 1);
      return arr;
    }
    if (data.image.isUrl) {
      try {
        let arr = await getDoc(doc(db, "products", "allProducts"));
        let newData = removeObjectWithId(arr?.data()?.data, isUpdate);
        !isDraft &&
          newData?.push({
            id: isUpdate,
            image: data?.image?.prev,
            content: data?.content,
            title: data?.title,
            category: data?.category,
            date: Timestamp.now(),
          });
        await updateDoc(doc(db, "products", "allProducts"), {
          data: [...newData],
        });
        if (isDraft) {
          let arr = await getDoc(doc(db, "products", "draft"));
          function removeObjectWithId(arr, id) {
            const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
            arr.splice(objWithIdIndex, 1);
            return arr;
          }
          let newData = removeObjectWithId(arr?.data()?.data, isUpdate);
          newData?.push({
            id: isUpdate,
            image: data?.image?.prev,
            content: data?.content,
            title: data?.title,
            category: data?.category,
            date: Timestamp.now(),
          });
          await updateDoc(doc(db, "products", "draft"), {
            data: [...newData],
          });
          navigate("/all-products");
        } else {
          let arr = await getDoc(doc(db, "products", "draft"));
          let newData = removeObjectWithId(arr?.data()?.data, isUpdate);
          await updateDoc(doc(db, "products", "draft"), {
            data: [...newData],
          });
          navigate("/products-draft");
        }
        toast.success(`Blog Updated successfully`);
        setDraft(false);
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
            getDoc(doc(db, "products", "allProducts"))
              .then((req) => {
                let newData = removeObjectWithId(req?.data()?.data, isUpdate);
                !isDraft &&
                  newData?.push({
                    id: isUpdate,
                    image: data?.image?.prev,
                    content: data?.content,
                    title: data?.title,
                    category: data?.category,
                    date: Timestamp.now(),
                  });
                updateDoc(doc(db, "products", "allProducts"), {
                  data: [...newData],
                }).then(() => {
                  if (isDraft) {
                    getDoc(doc(db, "products", "draft")).then((req) => {
                      function removeObjectWithId(arr, id) {
                        const objWithIdIndex = arr.findIndex(
                          (obj) => obj.id === id
                        );
                        arr.splice(objWithIdIndex, 1);
                        return arr;
                      }
                      let newData = removeObjectWithId(
                        req?.data()?.data,
                        isUpdate
                      );
                      newData?.push({
                        id: isUpdate,
                        image: data?.image?.prev,
                        content: data?.content,
                        title: data?.title,
                        category: data?.category,
                        date: Timestamp.now(),
                      });
                      updateDoc(doc(db, "products", "draft"), {
                        data: [...newData],
                      }).then(() => navigate("/all-products"));
                    });
                  }
                });
              })
              .then(() => {
                setPrev(false);
                toast.success(`Products Updated successfully`);
                setDraft(false);
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
              updateProduct(data);
            } else {
              addProduct(data);
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
