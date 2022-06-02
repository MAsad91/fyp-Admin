import axios from "axios";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";


const CrimeTable = (props) => { 
  console.log(props);
let columns = [
  {
    title: "ID",
    dataIndex: 'id',
    // render: (text) => <Link to={'/singledata'}>{text}</Link>,
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
  },
  {
    title: "Actions",
    render:(record) =>{
      return (
        <>
          <Link to={`/crimereport/${record.id}`}>
            <EyeOutlined style={{ color:"green", marginRight: 12}}/>
          </Link>
          <Link to={`/crimereport/editcrimeform/${record.id}`}>
            <EditOutlined style={{ color:"blue"}}/>
          </Link>
          <DeleteOutlined onClick={()=>{
            onDeleteUsers(record.id)
          }} style={{ color:"red", marginLeft: 12 }}/>
        </>
      );
    }
  }
];
const onDeleteUsers=(id) => {
  let data={"id":id}
  axios.post('http://localhost:5000/crime-report/deletedata',data)
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
        dataSource={props.crimeData}
        pagination={true}
        style={{ marginTop: "1rem" }}
      />
    </Fragment>
  );
};

export default CrimeTable;