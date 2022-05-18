import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";

const UserListTable = (props) => {
  console.log(props);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <Link to='/singledata'>{text}</Link>,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      dataIndex: "contactno",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    
  ];
  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={props.userListData}
        style={{ marginTop: "1rem" }}
      />
    </Fragment>
  );
};

export default UserListTable;