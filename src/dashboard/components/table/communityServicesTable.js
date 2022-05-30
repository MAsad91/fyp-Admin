import axios from "axios";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

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
    {
      title: "Actions",
      render:(record) =>{
        return (
          <>
            <EditOutlined style={{ color:"blue"}}/>
            <DeleteOutlined onClick={()=>{
              onDeleteUsers(record.id)
            }} style={{ color:"red", marginLeft: 12 }}/>
          </>
        );
      }
    },
  ];

  const onDeleteUsers=(id) => {
    let data={"id":id}
    axios.post('http://localhost:5000/request-communityservices/deletedata',data)
   .then((res) => {
       console.log('response',res);
   })
   .catch((error) => {
       console.log('error block called',error);
   })
  }
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