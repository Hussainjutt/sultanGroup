import React from "react";
import { Popconfirm, Table } from "antd";
import styled from "styled-components";
import Search from "antd/es/input/Search";
import { useEffect } from "react";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const Container = styled.div`
  background-color: #fafafa;
  box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.08);
  border: 1px solid #fafafa;
  border-radius: 8px;
`;
const Index = () => {
  const [date, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [show, setShow] = useState({ open: false, data: {} });
  const showPopconfirm = (id) => {
    setOpen(id);
  };
  const handleOk = async (id) => {
    try {
      setConfirmLoading(true);
      function removeObjectWithId(arr, id) {
        const objWithIdIndex = arr.findIndex((obj) => obj.key === id);
        arr.splice(objWithIdIndex, 1);
        return arr;
      }
      let arr = await getDoc(doc(db, "people", "contactList"));
      let newList = removeObjectWithId(arr.data().data, id);
      await updateDoc(doc(db, "people", "contactList"), {
        data: [...newList],
      });
      toast.success("Email deleted successfully");
      setTimeout(() => {
        setConfirmLoading(false);
        setOpen(null);
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleCancel = () => {
    !confirmLoading && setOpen(null);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => (
        <a href={`mailto:${text}`} style={{ textDecoration: "none" }}>
          {text}
        </a>
      ),
    },
    {
      title: "Contact #",
      dataIndex: "tel",
      render: (text) => (
        <a href={`tel:${text}`} style={{ textDecoration: "none" }}>
          {text}
        </a>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "key",
      render: (text, record) => (
        <>
          <Popconfirm
            title="Are sure to delete this contact"
            open={open === record.key}
            onConfirm={() => handleOk(record.key)}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
          >
            {" "}
            <MdDeleteForever
              style={{ color: "red", fontSize: "25px", cursor: "pointer" }}
              onClick={() => showPopconfirm(record.key)}
            />
          </Popconfirm>
          &nbsp;
          <BsFillInfoSquareFill
            style={{
              color: "#01A8E6",
              fontSize: "20px",
              cursor: "pointer",
              marginBottom: "-1px",
            }}
            onClick={() => setShow({ open: true, data: record })}
          />
        </>
      ),
    },
  ];
  useEffect(() => {
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
        var minutes =
          d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
        let time = hours + ":" + minutes + " " + am_pm;
        string = `${m}/${day}/${year} - ${time}`;
      }
      return string;
    };
    const unSub = onSnapshot(doc(db, "people", "contactList"), (doc) => {
      let arr = [];
      for (let i = 0; i < doc.data().data.length; i++) {
        arr.push({
          key: doc.data().data[i]?.key,
          name: doc.data().data[i]?.name,
          email: doc.data().data[i]?.email,
          tel: doc.data().data[i]?.tel,
          date: getDate(doc?.data()?.data[i]?.date),
          subject: doc.data().data[i]?.subject,
          message: doc.data().data[i]?.message,
        });
      }
      setData(arr);
      if (search) {
        let q1 = arr.filter(
          (el) =>
            el.email.slice(0, el.email.search("@")).toLowerCase() ===
              search.toLowerCase() ||
            el.email.toLowerCase() === search.toLowerCase()
        );
        let q2 = arr.filter(
          (el) => el.name.toLowerCase() === search.toLowerCase()
        );
        setData(q1.length === 0 ? q2 : q1);
      } else {
        setData(arr.reverse());
      }
    });
    return () => {
      unSub();
    };
  }, [search]);
  return (
    <>
      <Search
        placeholder="Search here"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={(e) => setSearch(e)}
        onChange={(e) => {
          e.target.value === "" && setSearch("");
        }}
        className="my-3 w-25"
      />
      <Container>
        <Table columns={columns} dataSource={date} />
        <Modal
          show={show.open}
          onHide={() => setShow({ ...show, open: false, data: {} })}
        >
          <Modal.Header closeButton>
            <Modal.Title>{show?.data?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <small>Subject : </small>
            <h3 style={{ marginTop: 0 }}>{show?.data?.subject}</h3>
            <small>Message : </small>
            <pre>{show?.data?.message}</pre>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between align-items-center">
            <p className="m-0">{show?.data?.date}</p>
            <Button
              variant="info text-white"
              onClick={() => setShow({ ...show, open: false, data: {} })}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Index;
