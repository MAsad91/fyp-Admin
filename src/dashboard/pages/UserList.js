import React, { useCallback, useContext, UseContext, useEffect, useState} from 'react';
import DataTable from '../components/table/UserListTable';
function UserList() {
  const [userListData, setUserListData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = fetch('http://localhost:5000/userlist');
      const jsonData = data.json();
      
      setUserListData(jsonData);
    }
    fetchData();
  }, [])
  return (
    <React.Fragment>
      <DataTable {...userListData}/>
    </React.Fragment>
  )
}

export default UserList