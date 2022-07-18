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
  CheckOutlined,
} from "@ant-design/icons";

import "./Table.css";

const CommunityServicesTable = (props) => {
  const navigate = useNavigate();
  console.log(props);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
    },
    {
      title: "ServiceType",
      dataIndex: "servicetype",
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
                onEmailAlert(record.creator, record.name);
              }}
            >
              <MailOutlined style={{ color: "skyblue" }} />
            </button>

            {/* <button
              className="alertbutton"
              style={{ marginLeft: 3 }}
              onClick={() => {
                onSmsAlert(record.id, record.name, record.email);
              }}
            >
              <MessageOutlined style={{ color: "skyblue" }} />
            </button> */}
          </>
        );
      },
    },
    {
      title: "Actions",
      width: "25%",
      render: (record) => {
        return (
          <>
            <Link to={`/communityservices/${record.id}`}>
              <EyeOutlined
                style={{
                  color: "green",
                  marginRight: 12,
                  fontSize: 20,
                }}
              />
            </Link>
            <Link to={`/communityservices/communityeditform/${record.id}`}>
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
        const response = await axios.delete(`http://localhost:5000/request-communityservices/${id}`);
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
  const onEmailAlert = async (id, name) => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/request-communityservices/emailalert`,
        data: {
          id: id,
          name: name,
        },
      });
      console.log(`RESPONSE::::: ${response.data.message}`);
      if(response.status==200){
        Modal.success({
         title: "Email Alert Sent",
        })
        
       }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
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
        dataSource={props.communityData}
        pagination={true}
        style={{ marginTop: "1rem" }}
      />
    </Fragment>
  );
};

export default CommunityServicesTable;
