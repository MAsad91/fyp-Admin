import React, { useCallback, useContext, UseContext, useEffect, useState} from 'react';
import DataTable from '../components/table/CertificatesTable';
function CertificatesReport() {
  const [certificateData, setCertificateData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:5000//request-certificatepermits');
      const jsonData = data.json();

      setCertificateData(jsonData);
    }
    fetchData();
  },[])

  console.log(certificateData);
  return (
    <React.Fragment>
      <DataTable {...certificateData}/>
    </React.Fragment>
  )
}

export default CertificatesReport