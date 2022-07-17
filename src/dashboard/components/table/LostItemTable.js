import axios from "axios";
import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  MessageOutlined,
  MailOutlined,
} from "@ant-design/icons";

import "./Table.css";

const LostItemTable = (props) => {
  const navigate = useNavigate();
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
      width: "25%",
    },
    {
      title: "Item Type",
      dataIndex: "lostitemtype",
      width: "25%",
    },
    // {
    //   title: "Alert",
    //   width: "%",
    //   render: (record) => {
    //     return (
    //       <>
    //         <button
    //           className="alertbutton"
    //           style={{ marginRight: 3 }}
    //           onClick={() => {
    //             onEmailAlert(record.id, record.name, record.email);
    //           }}
    //         >
    //           <MailOutlined style={{ color: "skyblue" }} />
    //         </button>

    //         <button
    //           className="alertbutton"
    //           style={{ marginLeft: 3 }}
    //           onClick={() => {
    //             onSmsAlert(record.id, record.name, record.email);
    //           }}
    //         >
    //           <MessageOutlined style={{ color: "skyblue" }} />
    //         </button>
    //       </>
    //     );
    //   },
    // },

    {
      title: "Actions",
      width: "25%",
      render: (record) => {
        return (
          <>
            <Link to={`/lostreport/${record.id}`}>
              <EyeOutlined
                style={{
                  color: "green",
                  marginRight: 12,
                  fontSize: 20,
                }}
              />
            </Link>
            <Link to={`/lostreport/losteditform/${record.id}`}>
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

  const onDeleteUsers = (id) => {
    Modal.confirm({
      title: "Are you sure, you want to delete ?",
      cancelText: "No",
      okText: "Yes",
      okType: "danger",
      onOk: async() => {
        const response = await axios.delete(`http://localhost:5000/lost-report/report/${id}`);
        if(response.status === 200){
          let currentPath = window.location.pathname;
              navigate(`${currentPath}/replace`);
              setTimeout(() => {
                navigate(currentPath);
              }, 0);
        }
      },
    });
  };
  // const onEmailAlert = (id, name, email) => {
  //   axios({
  //     method: "post",
  //     url: `http://localhost:5000/emailalert/${id}`,
  //     data: {
  //       name: name,
  //       email: email,
  //     },
  //   });
  // };
  // const onSmsAlert = (id, name, email) => {
  //   axios({
  //     method: "post",
  //     url: `http://localhost:5000/smsalert/${id}`,
  //     data: {
  //       name: name,
  //       email: email,
  //     },
  //   });
  // };

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
