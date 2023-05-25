import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "../../components/table/UserListTable";
function UserList() {
  const [userListData, setUserListData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/property");

        setUserListData(data);
      } catch (err) {}
    };
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <h1>UsersList</h1>
      <DataTable userListData={userListData} />
    </React.Fragment>
  );
}

export default UserList;
