import axios from "axios";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const SaveLifeTable = (props) => {
  console.log(props);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      // render: (text) => <Link to='/singledata'>{text}</Link>,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Report Type",
      dataIndex: "reporttype",
    },
    {
      title: "Actions",
      render: (record) => {
        return (
          <>
            <Link to={`/safelifereport/${record.id}`}>
              <EyeOutlined style={{ color: "green", marginRight: 12 }} />
            </Link>
            <Link to={`/safelifereport/safelifeeditform/${record.id}`}>
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
          .delete(`http://localhost:5000/safelife-report/${id}`)
          .then((res) => {
            console.log("response", res);
          })
          .catch((error) => {
            console.log("error block called", error);
          });
      },
    });
  };
  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={props.saveLife}
        pagination={true}
        style={{ marginTop: "1rem" }}
      />
    </Fragment>
  );
};

export default SaveLifeTable;
