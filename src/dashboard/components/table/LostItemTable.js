import axios from "axios";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const LostItemTable = (props) => {
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
      title: "Item Type",
      dataIndex: "lostitemtype",
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
