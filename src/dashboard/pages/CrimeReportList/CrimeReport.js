import axios from 'axios';
import React, { useEffect, useState} from 'react';
import DataTable from '../../components/table/CrimeTable';

function CrimeReport() {
  const [crimeData, setCrimeData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        const {data} = await axios.get('http://localhost:5000/crime-report');

        setCrimeData(data);
      } catch (err) {

      }
      
    }  
    fetchData();
  },[])
  
  

  return (
    <React.Fragment>
      <h1>Crime Report</h1>
      <DataTable crimeData={crimeData}/>
    </React.Fragment>
  )
}

export default CrimeReport