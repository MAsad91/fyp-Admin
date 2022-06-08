import axios from "axios";
import React, { Fragment } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const CertificateTable = (props) => {
  console.log(props);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      // render: (text) =><Link to='/singledata'>{text}</Link>
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
    {
      title: "Actions",
      render:(record) =>{
        return (
          <> 
            <Link to={`/certificatepermits/${record.id}`}>
              <EyeOutlined style={{ color:"green", marginRight: 12 }} />
            </Link>
            <Link to={`/certificatepermits/requesteditform/${record.id}`}>
              <EditOutlined style={{ color:"blue"}}/>
            </Link>
            
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
    axios.delete(`http://localhost:5000/crime-report/${id}`)
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
        dataSource={props.certificateData}
        pagination={true}
        style={{ marginTop: "1rem" }}
      />
    </Fragment>
  );
};

export default CertificateTable;