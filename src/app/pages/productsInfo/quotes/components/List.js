import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import {
  BsChatSquareQuoteFill,
  BsFillReplyAllFill,
  BsTelephone,
} from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { FaCommentAlt, FaComments } from "react-icons/fa";
import { SiOpenstreetmap } from "react-icons/si";
import { GiWorld } from "react-icons/gi";
import { CiSquareRemove } from "react-icons/ci";
import styled from "styled-components";
import { db } from "../../../../../firebase";
import { Popconfirm } from "antd";
import { toast } from "react-toastify";
import { MdOutlineEmail } from "react-icons/md";

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
  top: -18px;
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
const Name = styled.h4`
  font-weight: 600;
`;
const Email = styled.a`
  position: absolute;
  bottom: -4px;
  right: 5px;
  color: #00a8e8;
  font-size: 25px;
`;
const Text = styled.span``;
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
const Box = styled.div`
  margin: 0.5rem 0;
  display: flex;
  justtify-content: flex-start;
  grid-gap: 0.5rem;
  svg {
    font-size: 25px;
    color: #26c00c;
  }
`;
const Link = styled.a`
  text-decoration: none;
  color: #00a8e8;
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
  const handleDelete = async (prod, id) => {
    setLoading(true);
    function removeObjectWithId(arr, id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
      arr.splice(objWithIdIndex, 1);
      return arr;
    }
    try {
      let data = await getDoc(doc(db, "products", "allProducts"));
      let arr = data;
      arr = arr.data().data.filter((el) => el.id === prod);
      let quots = removeObjectWithId(arr[0].quots, id);
      let i = data.data().data.findIndex((el) => {
        return el.id === prod;
      });
      let Data = data.data().data.filter((el) => el.id !== prod);
      Data.splice(i, 0, {
        ...data.data().data[i],
        quots: [...quots],
      });
      await updateDoc(doc(db, "products", "allProducts"), {
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
    const unSub = onSnapshot(doc(db, "products", "allProducts"), (doc) => {
      setLoad(true);
      let data = doc.data().data.filter((el) => el.id === show.id);
      if (data.length === 0) {
        setShow({ ...show, data: [], id: "", open: false });
      } else {
        setShow({ ...show, data: data[0].quots.reverse() });
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
        <h1 className="text-center">There no quotes</h1>
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
              <BsChatSquareQuoteFill
                style={{
                  color: "#28BD11",
                  fontSize: "35px",
                }}
              />
              <Counts
                style={{
                  padding: el?.quots?.length <= 9 && "4px 7px 2px 7px",
                }}
              >
                {el?.quots?.length}
                {el?.quots?.length >= 10 && <sup>+</sup>}
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
            <h1 className="text-center">No quotes yet </h1>
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
                    title={"remove"}
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
                <Name className="my-1">
                  {el?.first_name + " " + el?.last_name}
                </Name>
                <Box>
                  <MdOutlineEmail />{" "}
                  <Link href={`mailto:${el?.email}`}>{el?.email}</Link>
                </Box>
                <Box>
                  <BsTelephone /> <Link href={`tel:${el?.tel}`}>{el?.tel}</Link>
                </Box>
                <Box>
                  <HiOutlineHome />
                  <Text> {el?.address}</Text>
                </Box>
                <Box>
                  <GiWorld />
                  <Text> {el?.country}</Text>
                </Box>
                <Box>
                  <HiOutlineChatBubbleBottomCenterText />
                  <Text className="m-0">{el?.message}</Text>
                </Box>
                <small>{getDate(el?.date)}</small>
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
