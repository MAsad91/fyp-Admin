import React, { useCallback, useContext, UseContext, useEffect, useState} from 'react';
import DataTable from '../components/table/LostItemTable';
function LostReport() {
  const[lostData, setLostData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:5000/lost-report');
      const jsonData = data.json();

      setLostData(jsonData);
    }
    fetchData();
  },[])

  return (
    <React.Fragment>
      <DataTable {...lostData}/>
    </React.Fragment>
  )
}

export default LostReport