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

const CrimeTable = (props) => {
  const navigate = useNavigate();
  console.log(props);
  let columns = [
    {
      title: "Name",
      dataIndex: "name",
      fontSize: "30px",
      width: "25%",
    },
    {
      title: "Type",
      dataIndex: "crimetype",
      width: "25%",
    },
    // {
    //   title: "Alert",
    //   width: "25%",
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
            <Link to={`/crimereport/${record.id}`}>
              <EyeOutlined
                style={{
                  color: "green",
                  marginRight: 12,
                  fontSize: 20,
                }}
              />
            </Link>
            <Link to={`/crimereport/editcrimeform/${record.id}`}>
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
        const response = await axios.delete(`http://localhost:5000/crime-report/${id}`);
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
        className="wholetable"
        columns={columns}
        dataSource={props.crimeData}
        pagination={true}
      />
    </Fragment>
  );
};

export default CrimeTable;
