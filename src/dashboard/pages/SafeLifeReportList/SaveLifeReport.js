import axios
 from 'axios';
import React, { useEffect, useState} from 'react';
import DataTable from '../../components/table/SaveLifeTable';

function SaveLifeReport() {
  const[saveLife, setSaveLife] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      try{
        const {data} = await axios.get('http://localhost:5000/safelife-report');

      setSaveLife(data);
      } catch (err) {

      }
      
    }
    fetchData();
  }, [])
  
  return (
    <React.Fragment>
      <h1>Save Life Report</h1>
      <DataTable saveLife = {saveLife}/>
    </React.Fragment>
  )
}

export default SaveLifeReport