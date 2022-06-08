import axios from "axios";
import React, { useEffect, useState} from 'react';
import DataTable from '../../components/table/FoundItemTable';
function FoundReport() {
  const[foundData, setFoundData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try{
        const {data} = await axios.get('http://localhost:5000/found-report');
        

        setFoundData(data);
      } catch (err) {

      }
      
    }
    fetchData();
  },[])

  return (
    <React.Fragment>
      <h1>Found Reports</h1>
      <DataTable foundData = {foundData}/>
    </React.Fragment>
  )
}

export default FoundReport