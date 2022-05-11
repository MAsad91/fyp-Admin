import React, { useCallback, useContext, UseContext, useEffect, useState} from 'react';
import DataTable from '../components/table/CrimeTable';
function CommunityReport() {
  const[communityData, setCommunityData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
    const data = await fetch('http://localhost:5000/request-communityservices');
      const jsonData = data.json();

      setCommunityData(jsonData);
    }
    fetchData();
  }, [])
  return (
    <React.Fragment>
      <DataTable props={communityData}/>
    </React.Fragment>
  )
}
export default CommunityReport