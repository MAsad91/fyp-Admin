import React, { Fragment } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

const CertificateTable = (props) => {
  console.log(props);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) =><Link to='/singledata'>{text}</Link>
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Request Type",
      dataIndex: "requesttype",
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
        dataSource={props.certificateData}
        style={{ marginTop: "1rem" }}
      />
    </Fragment>
  );
};

export default CertificateTable;