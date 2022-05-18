import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { Table } from "antd";

const CrimeTable = (props) => {
  console.log(props);
let columns = [
  {
    title: "ID",
    dataIndex: 'id',
    render: (text) => <Link to='/singledata'>{text}</Link>,
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Type",
    dataIndex: "crimetype",
  },
  {
    title: "Details",
    dataIndex: "details",
  },
  {
    title: "Location",
    dataIndex: "location",
  }
];

   
  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={props.crimeData}
        style={{ marginTop: "1rem" }}
      />
    </Fragment>
  );
};

export default CrimeTable;