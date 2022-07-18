import axios from "axios";
import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import "./Table.css";

const EventsTable = (props) => {
  const navigate = useNavigate();
  console.log(props);
  let columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
    },
    {
      title: "Type",
      dataIndex: "eventtype",
      width: "25%",
    },
    {
      title: "Actions",
      width: "25%",
      render: (record) => {
        return (
          <>
            <Link to={`/events/${record.id}`}>
              <EyeOutlined
                style={{
                  color: "green",
                  marginRight: 12,
                  fontSize: 20,
                }}
              />
            </Link>
            <Link to={`/events/eventform/${record.id}`}>
              <EditOutlined
                style={{ color: "blue", fontSize: 20 }}
                Link
                to="/userlist/edit"
              />
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
        const response = await axios.delete(`http://localhost:5000/events/${id}`);
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
  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={props.EventData}
        pagination={true}
        style={{ marginTop: "1rem" }}
      />
    </Fragment>
  );
};

export default EventsTable;
