import React, { useCallback, useContext, UseContext, useEffect, useState} from 'react';
import DataTable from '../components/table/CrimeTable';
function CrimeReport() {
  const[crimeData, setCrimeData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:5000/crime-report');
      const jsonData = data.json();

      setCrimeData(jsonData);
    }
    fetchData();
  },[])


  return (
    <React.Fragment>
      <DataTable {...crimeData}/>
    </React.Fragment>
  )
}

export default CrimeReport