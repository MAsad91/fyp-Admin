import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";

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
      title: "State",
      dataIndex: "state",
    },
    {
      title: "Item Type",
      dataIndex: "lostitemtype",

    },
    {
      title: "Color",
      dataIndex: "color",
      
    },
    {
      title: "Discription",
      dataIndex: "description",
    },
    {
      title: "Details",
      dataIndex: "details",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
  ];
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