import axios from "axios";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Table, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  MessageOutlined,
  MailOutlined,
} from "@ant-design/icons";

const LostItemTable = (props) => {
  console.log(props);
  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   // render: (text) => <Link to='/singledata'>{text}</Link>,
    // },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Item Type",
      dataIndex: "lostitemtype",
    },
    {
      title: "Alert",
      render: (record) => {
        return (
          <>
            <button
              style={{ marginRight: 3 }}
              onClick={() => {
                onEmailAlert(record.id, record.name, record.email);
              }}
            >
              <MailOutlined />
            </button>

            <button
              style={{ marginLeft: 3 }}
              onClick={() => {
                onSmsAlert(record.id, record.name, record.email);
              }}
            >
              <MessageOutlined />
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
            <Link to={`/lostreport/${record.id}`}>
              <EyeOutlined style={{ color: "green", marginRight: 12 }} />
            </Link>
            <Link to={`/lostreport/losteditform/${record.id}`}>
              <EditOutlined style={{ color: "blue" }} />
            </Link>

            <DeleteOutlined
              onClick={() => {
                onDeleteUsers(record.id);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onDeleteUsers = (id) => {
    Modal.confirm({
      title: "Are you sure, you want to delete ?",
      cancelText: "No",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        axios
          .delete(`http://localhost:5000/lost-report/${id}`)
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
        dataSource={props.lostData}
        pagination={true}
        style={{ marginTop: "1rem" }}
      />
    </Fragment>
  );
};

export default LostItemTable;
