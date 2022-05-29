import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Table } from "antd";

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
    
  ];
  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={props.userListData}
        pagination={true}
        
        onRow={(record) => {
          return {
            onClick: () => {
              
              <UserDetail record={record} />
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