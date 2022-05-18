import axios from "axios";
import React, { useEffect, useState} from 'react';
import DataTable from '../components/table/LostItemTable';
function LostReport() {
  const[lostData, setLostData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try{
        const {data} = await axios.get('http://localhost:5000/lost-report');
        

        setLostData(data);
      } catch (err) {

      }
      
    }
    fetchData();
  },[])

  return (
    <React.Fragment>
      <h1>Lost Reports</h1>
      <DataTable lostData = {lostData}/>
    </React.Fragment>
  )
}

export default LostReport