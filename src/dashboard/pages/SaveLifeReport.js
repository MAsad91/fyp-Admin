import React, { useCallback, useContext, UseContext, useEffect, useState} from 'react';
import DataTable from '../components/table/SaveLifeTable';

function SaveLifeReport() {
  const[saveLife, setSaveLife] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const data = await fetch('http://localhost:5000/safelife-report');
      const jsonData = data.json();

      setSaveLife(jsonData);
    }
    fetchData();
  }, [])
  console.log(saveLife);
  return (
    <React.Fragment>
      <DataTable {...saveLife}/>
    </React.Fragment>
  )
}

export default SaveLifeReport