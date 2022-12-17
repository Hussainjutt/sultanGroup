import React from "react";
import { Table } from "antd";
import styled from "styled-components";
import Search from "antd/es/input/Search";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Cash Assets",
    className: "column-money",
    dataIndex: "money",
    align: "right",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    money: "￥300,000.00",
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    money: "￥1,256,000.00",
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    money: "￥120,000.00",
    address: "Sidney No. 1 Lake Park",
  },
];
const Container = styled.div`
  background-color: #fafafa;
  box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.08);
  border: 1px solid #fafafa;
  border-radius: 8px;
`;
const Index = () => (
  <>
    <Search
      addonBefore="Emails"
      placeholder="search here"
      className="w-25 m-2"
      onSearch={(e) => console.log(e)}
      enterButton
      allowClear
    />
    <Container>
      <Table columns={columns} dataSource={data} />
    </Container>
  </>
);

export default Index;
