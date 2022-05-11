import React, { useCallback, useContext, UseContext, useEffect, useState} from 'react';
import DataTable from '../components/table/FoundItemTable';
function FoundReport() {
  const[foundData, setFoundData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:5000/found-report');
      const jsonData = data.json();

      setFoundData(jsonData);
    }
    fetchData();
  },[])

  return (
    <React.Fragment>
      <DataTable {...foundData}/>
    </React.Fragment>
  )
}

export default FoundReport