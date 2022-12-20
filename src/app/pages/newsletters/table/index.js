import React from "react";
import { Popconfirm, Table } from "antd";
import styled from "styled-components";
import Search from "antd/es/input/Search";
import { useEffect } from "react";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useState } from "react";
import { MdDeleteForever, MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";

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
  const handleDelete = (id) => {
    console.log(id);
  };
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
      let arr = await getDoc(doc(db, "people", "newsLetters"));
      let newList = removeObjectWithId(arr.data().data, id);
      await updateDoc(doc(db, "people", "newsLetters"), {
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
      title: "Email",
      dataIndex: "email",
      render: (text) => (
        <a href={`mailto:${text}`} style={{ textDecoration: "none" }}>
          {text}
        </a>
      ),
    },
    {
      title: "date",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "key",
      render: (text, record) => (
        <Popconfirm
          title="Are sure to delete this email"
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
    const unSub = onSnapshot(doc(db, "people", "newsLetters"), (doc) => {
      let arr = [];
      for (let i = 0; i < doc.data().data.length; i++) {
        arr.push({
          key: doc.data().data[i]?.key,
          email: doc.data().data[i]?.email,
          date: getDate(doc?.data()?.data[i]?.date),
        });
      }
      if (search) {
        let dummy = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].email.toLowerCase().includes(search.toLowerCase())) {
            dummy.push(arr[i]);
          }
        }
        setData(dummy.reverse());
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
          setSearch(e.target.value);
        }}
        className="my-3 w-25"
      />
      <Container>
        <Table columns={columns} dataSource={date} />
      </Container>
    </>
  );
};

export default Index;
