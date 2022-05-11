import React, { Fragment } from "react";
import { Table } from "antd";

const CrimeTable = (props) => {

  console.log(props);
  const columns = [
    {
      title: "Name",
      dataIndex: Object.PromiseResult,
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

export default CrimeTable;