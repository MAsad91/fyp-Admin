import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";

const CommunityServicesTable = (props) => {
  console.log(props);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      // render: (text) => <Link to='/singledata'>{text}</Link>,
    },
    {
      title: "Name",
      dataIndex: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "ServiceType",
      dataIndex: 'servicetype',
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
        dataSource={props.communityData}
        pagination={true}
        style={{ marginTop: "1rem" }}
      />
    </Fragment>
  );
};

export default CommunityServicesTable;