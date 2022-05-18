import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";

const SaveLifeTable = (props) => {
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
    },
    {
      title: "Report Type",
      dataIndex: "reporttype",
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
        dataSource={props.saveLife}
        style={{ marginTop: "1rem" }}
      />
    </Fragment>
  );
};

export default SaveLifeTable;