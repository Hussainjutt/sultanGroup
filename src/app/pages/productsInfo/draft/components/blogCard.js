import React, { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { AiOutlineComment } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Popconfirm } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase";
import { toast } from "react-toastify";

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 18em;
  height: 22em;
  background: url(${(props) =>
      props.image
        ? props.image
        : "https://cache.desktopnexus.com/thumbseg/25/25727-bigthumbnail.jpg"})
    no-repeat;
  background-size: 22em 30em;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.5);
  margin: auto;
  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
  overflow: hidden;
  border-radius: 0.7em;
  * {
    position: relative;
    z-index: 2;
  }
  &:hover .color-overlay {
    background: rgba(74, 100, 114, 0.8);
  }
  &:hover .info {
    bottom: -3em;
    opacity: 1;
  }
  .blogs-icons {
    color: white;
    opacity: 0;
  }
  &:hover .blogs-icons {
    opacity: 1 !important;
    cursor: pointer;
    &:hover {
      color: #27bf0f;
    }
    &:last-child {
      &:hover {
        color: red;
      }
    }
  }
`;
const Overlay = styled.div`
  border-radius: 0.7em;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  transition: 0.7s background;
  background: rgba(74, 100, 114, 0.3);
  z-index: 1;
`;
const Info = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.2em;
  color: #ddd;
  line-height: 1.1em;
  padding: 0 2em;
  position: relative;
  bottom: -4em;
  opacity: 0;
  background: transparent;
  transition: opacity 0.3s, bottom 0.3s;
  text-align: center;
`;
const Header = styled.div`
  display: inline-block;
  width: 100%;
  text-align: center;
  margin-top: 2em;
  hr {
    width: 5em;
    height: 0.25em;
    box-sizing: content-box;
    border: none;
    background: #00a8e8;
    margin: -0.4em auto 1em auto;
  }
`;
const H3 = styled.h3`
  display: inline-block;
  font-weight: 500;
  letter-spacing: 2px;
  font-size: 1.4em;
  color: white;
  text-align: center;
`;
const Intro = styled.div`
  width: 170px;
  margin: 0 auto;
  color: #fff;
  font-family: "Droid Serif", serif;
  font-size: 13px;
  font-style: italic;
  line-height: 18px;
`;
const Footer = styled.div`
  display: inline-block;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10em;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
  border-radius: 0 0 0.7em 0.7em;
`;
const Box = styled.div`
  position: absolute;
  bottom: 0;
  height: 3em;
  width: 100%;
  display: inline-block;
  font-size: 1.2em;
  padding: 0 2em;
`;
const BlogCard = ({ data, arr }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const getDate = () => {
    let string = "";
    let d = data?.date?.toDate();
    let m = d.toLocaleString("default", { month: "short" });
    let day = d?.getDate();
    let year = d?.getFullYear();
    string = `${m}.${day}.${year}`;
    return string;
  };
  let date = "";
  if (data?.date) {
    date = getDate();
  }
  const handleDelete = async (id) => {
    try {
      function removeObjectWithId(arr, id) {
        const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
        arr.splice(objWithIdIndex, 1);
        return arr;
      }
      let newData = removeObjectWithId(arr, id);
      await updateDoc(doc(db, "products", "draft"), {
        data: [...newData],
      });
      toast.success(`Product deleted successfully`);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      <Container image={data?.image}>
        <Header>
          <H3>Admin</H3>
          <hr />
          <Intro>{data?.category}</Intro>
        </Header>
        <Info className="info">
          <span>{data?.title}</span>
        </Info>
        <Footer>
          <Box className="d-flex justify-content-start  gap-3">
            <span>
              <AiOutlineComment
                style={{
                  color: "#00A8E8",
                  fontSize: "20px",
                  position: "relative",
                  top: "-2px",
                }}
              />
              &nbsp;
              <span style={{ color: "#27BF0F" }}>{data?.comments?.length}</span>
            </span>
            <span>
              <CiCalendarDate
                style={{
                  color: "#00A8E8",
                  fontSize: "20px",
                  position: "relative",
                  top: "-2px",
                }}
              />
              &nbsp;
              <span style={{ color: "#27BF0F" }}>{date}</span>
            </span>
          </Box>
        </Footer>
        <Overlay className="color-overlay"></Overlay>
        <span
          className="blogs-icons"
          style={{
            fontSize: "25px",
            position: "absolute",
            top: "-4px",
            right: "7px",
          }}
          onClick={() => navigate(`/edit-product:${data?.id}`)}
        >
          <TbEdit />
        </span>
        <span
          className="blogs-icons"
          style={{
            fontSize: "26px",
            position: "absolute",
            top: "22px",
            right: "8px",
          }}
          onClick={() => setShow(true)}
        >
          <MdDeleteOutline />
        </span>
        <Modal
          centered={true}
          size="sm"
          show={show}
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>
              Are you sure to <b>Delete</b> this Blog
            </h3>
          </Modal.Body>
          <Modal.Footer>
            <Button>Cancel</Button>
            <Button variant="danger" onClick={() => handleDelete(data?.id)}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default BlogCard;
