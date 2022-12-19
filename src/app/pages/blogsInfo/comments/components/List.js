import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { BsFillReplyAllFill } from "react-icons/bs";
import { FaCommentAlt, FaComments } from "react-icons/fa";
import { CiSquareRemove } from "react-icons/ci";
import styled from "styled-components";
import { db } from "../../../../../firebase";
import { Popconfirm } from "antd";
import { toast } from "react-toastify";

const Container = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.7rem;
  overflow-x: auto;
`;
const Img = styled.img`
  width: 100%;
  max-width: 120px;
  height: 80px;
  border: 1px solid #ccc;
  border-radius: 0.7rem;
`;
const Item = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  grid-gap: 2%;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    transition: 0.3s;
    background-color: #eff0f2;
    border-radius: 0.4rem;
  }
`;
const Title = styled.p`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Counts = styled.small`
  background: #00a8e8;
  color: white;
  padding: 4px 2px 2px 5px;
  border-radius: 11px;
  font-size: 11px;
  position: relative;
  top: -10px;
  left: -15px;
`;
const Comment = styled.div`
  background-color: #fafafa;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid #eff0f2;
  &:hover {
    transition: 0.4s;
    background-color: #eff0f2;
  }
`;
const Avatar = styled.span`
  background-color: ${(props) => props.bg};
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
const Name = styled.span`
  font-weight: 600;
`;
const Email = styled.a`
  position: absolute;
  bottom: -4px;
  right: 5px;
  color: #00a8e8;
  font-size: 25px;
`;
const Text = styled.p`
  padding: 1rem 0.4rem;
  font-size: 14px;
`;
const Body = styled(Modal.Body)`
  max-height: 70vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #ccc;
  }

  &::-webkit-scrollbar-thumb {
    background: #1c1c1c;
    border-radius: 4px;
  }
`;
const List = ({ data = [], isLoading }) => {
  const [show, setShow] = useState({
    open: false,
    data: [],
    id: "",
    title: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(null);
  const [load, setLoad] = useState(false);
  const getDate = (date) => {
    let string = "";
    if (date) {
      let d = date.toDate();
      let m = d.toLocaleString("default", { month: "short" });
      let day = d?.getDate();
      let year = d?.getFullYear();
      var hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
      var am_pm = d.getHours() >= 12 ? "PM" : "AM";
      hours = hours < 10 ? "0" + hours : hours;
      var minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      let time = hours + ":" + minutes + " " + am_pm;
      string = `${m}/${day}/${year} - ${time}`;
    }
    return string;
  };
  const randColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;
    let color = "#" + randomColor;
    return color;
  };
  const handleDelete = async (blog, id) => {
    setLoading(true);
    function removeObjectWithId(arr, id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
      arr.splice(objWithIdIndex, 1);
      return arr;
    }
    try {
      let data = await getDoc(doc(db, "blogs", "allBlogs"));
      let arr = data;
      arr = arr.data().data.filter((el) => el.id === blog);
      let comments = removeObjectWithId(arr[0].comments, id);
      let i = data.data().data.findIndex((el) => {
        return el.id === blog;
      });
      let Data = data.data().data.filter((el) => el.id !== blog);
      Data.splice(i, 0, {
        ...data.data().data[i],
        comments: [...comments],
      });
      await updateDoc(doc(db, "blogs", "allBlogs"), {
        data: [...Data],
      });
      setTimeout(() => {
        setLoading(false);
        toast.success("Deleted successfully");
        setOpen(null);
      }, 1000);
    } catch (err) {
      setOpen(null);
      toast.error(err.message);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "blogs", "allBlogs"), (doc) => {
      setLoad(true);
      let data = doc.data().data.filter((el) => el.id === show.id);
      if (data.length === 0) {
        setShow({ ...show, data: [], id: "", open: false });
      } else {
        setShow({ ...show, data: data[0].comments.reverse() });
      }
      setTimeout(() => {
        setLoad(false);
      }, 1200);
    });
    return () => {
      unSub();
    };
  }, [show.id]);
  return (
    <Container>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner variant="dark" />
        </div>
      ) : data.length === 0 ? (
        <h1 className="text-center">There no blogs</h1>
      ) : (
        data.map((el, i) => (
          <Item
            onClick={() =>
              setShow({ ...show, id: el.id, open: true, title: el.title })
            }
          >
            <div className="d-flex align-items-center gap-3">
              <div style={{ width: "120px" }}>
                <Img src={el?.image} />
              </div>
              <div style={{ maxWidth: "400px" }}>
                <Title>{el?.title}</Title>
                <p className="m-0">{getDate(el?.date)}</p>
              </div>
            </div>
            <p className="m-0">
              <FaComments
                style={{
                  color: "#28BD11",
                  fontSize: "35px",
                }}
              />
              <Counts
                style={{
                  padding: el?.comments?.length <= 9 && "4px 7px 2px 7px",
                }}
              >
                {el?.comments?.length}
                {el?.comments?.length >= 10 && <sup>+</sup>}
              </Counts>
            </p>
          </Item>
        ))
      )}
      <Modal
        show={show.open}
        onHide={() => setShow({ ...show, data: [], open: false })}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{show.title}</Modal.Title>
        </Modal.Header>
        <Body>
          {load ? (
            <div className="d-flex justify-content-center">
              <Spinner variant="info" />
            </div>
          ) : show.data?.length === 0 ? (
            <h1 className="text-center">No comments yet </h1>
          ) : (
            show.data?.map((el, i) => (
              <Comment className="position-relative rounded" key={i}>
                <Email href={`mailto:${el?.email}`} title={"Reply"}>
                  {" "}
                  <BsFillReplyAllFill />
                </Email>
                <Popconfirm
                  className="hey"
                  title="Are sure to Delete this comment"
                  open={open === el.id}
                  onConfirm={() => handleDelete(show?.id, el.id)}
                  okButtonProps={{ loading: loading }}
                  onCancel={() => !loading && setOpen(null)}
                >
                  <CiSquareRemove
                    title={el.id}
                    onClick={() => setOpen(el.id)}
                    style={{
                      color: "red",
                      fontSize: "25px",
                      position: "absolute",
                      right: "-1px",
                      top: "-2px",
                      cursor: "pointer",
                    }}
                  />
                </Popconfirm>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <Avatar bg={randColor()}>
                      {el.name?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Name>{el?.name}</Name>
                  </div>
                  <span style={{ fontSize: "12px" }}>{getDate(el?.date)}</span>
                </div>
                <Text className="m-0">{el?.comment}</Text>
              </Comment>
            ))
          )}
        </Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => setShow({ ...show, data: [], open: false, id: "" })}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default List;
