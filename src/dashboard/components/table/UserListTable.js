import axios from "axios";
import React, { Fragment } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import UserDetail from '../../pages/UserDetail';


const UserListTable = (props) => {
  console.log(props);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      // render: (text) => <Link to={`/userdetail`}>{text}</Link>,
      // render: (text) => <Link to='/singledata'>{text}</Link>,
      // onRow: (record, rowIndex) => {
      //   return {
      //     onClick: (ev) => {

      //       // <Link onClick={<SingleData record={record} />} to='/singledata'> </Link>
      //       <>
      //       <p>{record.id}</p>
      //       </>
      //       console.log(record);
      //   }, // click row
      //   };
      // },
    //   onCell: (record) => {
    //     return {
    //         onClick: (ev) => {

    //             // <Link onClick={<SingleData record={record} />} to='/singledata'> </Link>
    //             <>
    //             <p>{record.id}</p>
    //             </>
    //             console.log(record);
    //         },
            
    //     };
    // },
      
    },
    {
      title: "Name",
      dataIndex: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      dataIndex: "contactno",
    },
    {
      title: "Address",
      dataIndex: "address",
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
    }
    
  ];

  const onDeleteUsers=(id) => {
    let data={"id":id}
    axios.post('http://localhost:5000/userlist/deletedata',data)
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
        dataSource={props.userListData}
        pagination={true}
        
        onRow={(record) => {
          return {
            onClick: () => {
              
              
              console.log(record);
              
            }, // click row
            
          };
        }}
        style={{ marginTop: "1rem" }}
      />
    </Fragment>
  );
};

export default UserListTable;