import axios from 'axios';
import React, { useEffect, useState} from 'react';
import DataTable from '../components/table/communityServicesTable';
function CommunityReport() {
  const[communityData, setCommunityData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try{
        const {data}= await axios.get('http://localhost:5000/request-communityservices');
      
        setCommunityData(data);

      } catch (err) {
        
      }
    
    }
    fetchData();
  }, [])
  return (
    <React.Fragment>
      <h1>Community Services</h1>
      <DataTable communityData = {communityData}/>
    </React.Fragment>
  )
}
export default CommunityReport