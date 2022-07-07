import axios from "axios";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Table, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  MessageOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "./Table.css";

const UserListTable = (props) => {
  console.log(props);
  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    // render: (text) => <Link to={`/userdetail`}>{text}</Link>,
    // render: (text) => <Link to='/singledata'>{text}</Link>,
    // onRow: (record, rowIndex) => {
    //   return {
    //     onClick: (ev) => {

    //       // <Link onClick={<SingleData record={record} />} to='/singledata'> </Link>
    //       <>
    //       <p>{record.id}</p>
    //       </>
    //       console.log(record);
    //   }, // click row
    //   };
    // },
    //   onCell: (record) => {
    //     return {
    //         onClick: (ev) => {

    //             // <Link onClick={<SingleData record={record} />} to='/singledata'> </Link>
    //             <>
    //             <p>{record.id}</p>
    //             </>
    //             console.log(record);
    //         },

    //     };
    // },
    // },
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "25%",
    },
    {
      title: "Alert",
      width: "25%",
      render: (record) => {
        return (
          <>
            <button
              className="alertbutton"
              style={{ marginRight: 3 }}
              onClick={() => {
                onEmailAlert(record.id, record.name, record.email);
              }}
            >
              <MailOutlined style={{ color: "skyblue" }} />
            </button>

            <button
              className="alertbutton"
              style={{ marginLeft: 3 }}
              onClick={() => {
                onSmsAlert(record.id, record.name, record.email);
              }}
            >
              <MessageOutlined style={{ color: "skyblue" }} />
            </button>
          </>
        );
      },
    },
    {
      title: "Actions",
      render: (record) => {
        return (
          <>
            <Link to={`/userlist/${record.id}`}>
              <EyeOutlined
                style={{
                  color: "green",
                  marginRight: 12,
                  fontSize: 20,
                }}
              />
            </Link>

            <Link to={`/userlist/userform/${record.id}`}>
              <EditOutlined style={{ color: "blue", fontSize: 20 }} />
            </Link>

            <DeleteOutlined
              onClick={() => {
                onDeleteUsers(record.id);
              }}
              style={{ color: "red", marginLeft: 12, fontSize: 20 }}
            />
          </>
        );
      },
    },
  ];

  const onDeleteUsers = async (id) => {
    Modal.confirm({
      title: "Are you sure, you want to delete ?",
      cancelText: "No",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        axios
          .delete(`http://localhost:5000/userlist/${id}`)
          .then((res) => {
            console.log("response", res);
          })
          .catch((error) => {
            console.log("error block called", error);
          });
      },
    });
  };
  const onEmailAlert = (id, name, email) => {
    axios({
      method: "post",
      url: `http://localhost:5000/emailalert/${id}`,
      data: {
        name: name,
        email: email,
      },
    });
  };
  const onSmsAlert = (id, name, email) => {
    axios({
      method: "post",
      url: `http://localhost:5000/smsalert/${id}`,
      data: {
        name: name,
        email: email,
      },
    });
  };
  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={props.userListData}
        pagination={true}
        // onRow={(record) => {
        //   return {
        //     onClick: () => {

        //       console.log(record);

        //     }, // click row

        //   };
        // }}
        style={{ marginTop: "1rem" }}
      />
    </Fragment>
  );
};

export default UserListTable;
