import axios from "axios";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

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
    axios.post('http://localhost:5000/lost-report/deletedata',data)
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
        dataSource={props.lostData}
        pagination={true}
        style={{ marginTop: "1rem" }}
      />
    </Fragment>
  );
};

export default LostItemTable;