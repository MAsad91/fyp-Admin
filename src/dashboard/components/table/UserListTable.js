import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "datatables.net-dt/css/jquery.dataTables.css";
import axios from "axios";
import { Modal, message } from 'antd';

const MyDataTable = () => {
  const [user, setUser] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [name, setName] = useState('');
  const [phoneno, setPhoneNo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:5000/auth/user");
      console.log(data);
      setUser(data);
    };
    fetchData();
  }, []);

  const handleEdit = (itemId, itemName, itemPhoneNo) => {
    setEditItemId(itemId);
    setName(itemName);
    setPhoneNo(itemPhoneNo);
  };
  const handleSave = (itemId) => {
    try {
      Modal.confirm({
        title: 'Update user',
        content: 'Do you want to update this user?',
        okText: "Yes",
        cancelText:"No",
        onOk: async () => {
          // Perform the user verification
          const response = await axios.patch(
            `http://localhost:5000/auth/update/${itemId}`,
            { name,phoneno }
          );
  
          if (response.status === 200) {
            Modal.success({
              title: 'User Updated Successfully!',
              content: response.data.message,
              onOk: () => {
                console.log(response.data);
                setEditItemId(null);
              },
            });
          }
        },
      });
    } catch (err) {
      const message =
        err.response.data.message || 'Something went wrong, please try again!';
      Error(message);
      console.log(err.response.data.message, err.response.status);
    }
    setEditItemId(null);
  };
  

  if (user.length === 0) {
    return <div>Loading...</div>;
  }

  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 270,
      },
      {
        label: "Phone No.",
        field: "phoneno",
        sort: "asc",
        width: 200,
      },
      {
        label: "Action",
        field: "action",
        sort: "disabled",
        width: "150px",
      },
    ],
    rows: user.map((item) => ({
      id: item.id,
      name:
        editItemId === item.id ? (
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        ) : (
          item.name
        ),
      phoneno:
        editItemId === item.id ? (
          <input type="text" value={phoneno} onChange={(e) => setPhoneNo(e.target.value)} />
        ) : (
          item.phoneno
        ),
      action: (
        <div className="action-buttons">
          {editItemId === item.id ? (
            <button onClick={() => handleSave(item.id)}>Save</button>
          ) : (
            <EditOutlined
              style={{ color: "blue", fontSize: 24 }}
              onClick={() => handleEdit(item.id, item.name, item.phoneno)}
            />
          )}
          <DeleteOutlined
            // onClick={() => handleDelete(item)}
            style={{ color: "red", marginLeft: 12, fontSize: 24 }}
          />
        </div>
      ),
    })),
  };

  const options = {
    searchBox: true, // Enable the search box
    searchBoxClass: "form-control", // Set the class for the search box
    searchLabel: "Search", // Set the label for the search box
    searchText: "", // Set the initial search text
    filterText: "Filter", // Set the label for the filter dropdown
    responsive: true, // Enable responsive mode
    responsiveSm: true,
    responsiveMd: true,
    responsiveLg: true,
    responsiveXl: true,
    rowsPerPage: 10, // Set the number of rows per page
    paginationLabel: ["Previous", "Next"], // Set the labels for pagination
  };

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        fontSize: "18px",
        whiteSpace: "nowrap",
      }}
    >
      <MDBDataTable
        id="myDataTable"
        data={data}
        options={options}
        searching={true}
        sortable={true}
        striped
        bordered
        noBottomColumns={true}
      />
    </div>
  );
};

export default MyDataTable;
