import React, { Fragment } from "react";
import { Table } from "antd";

const DataTable = (props) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Type",
      dataIndex: props.type,
    },
    {
      title: "Details",
      dataIndex: "details",
    },
  ];
  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={props.data}
        style={{ marginTop: "1rem" }}
      />
    </Fragment>
  );
};

export default DataTable;