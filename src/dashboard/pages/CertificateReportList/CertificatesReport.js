import axios from 'axios';
import React, { useEffect, useState} from 'react';
import DataTable from '../../components/table/CertificatesTable';
function CertificatesReport() {
  const [certificateData, setCertificateData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const {data}= await axios.get('http://localhost:5000/request-certificatepermits');
        
      setCertificateData(data);
      } catch (err) {

      }
      
    }
    fetchData();
  },[])

  console.log(certificateData);
  return (
    <React.Fragment>
      <h1>Certificate & Permits</h1>
      <DataTable certificateData = {certificateData}/>
    </React.Fragment>
  )
}

export default CertificatesReport