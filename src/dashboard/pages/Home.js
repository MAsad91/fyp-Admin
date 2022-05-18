import axios from 'axios';
import React, { useCallback, useContext, UseContext, useEffect, useState} from 'react';
import Cards from '../components/cards/Cards';
import DoughnutChart from '../components/charts/DoughnutChart'; 
function Home() {

  const [crimeCount, setCrimeCount] = useState();
    const [saveLifeCount, setSaveLifeCount] = useState();
    const [foundItemCount, setFoundItemCount] = useState();
    const [lostItemCount, setLostItemCount] = useState();
    const [communityServicesCount, setCommunityServicesCount] = useState();
    const [certificateCount, setCertificateCount] = useState();


    useEffect(() =>{
        const fetchData = async () => {
          const {data} = await axios.get('http://localhost:5000/home');
          
          setCrimeCount(data.crimeReportCount);
          setSaveLifeCount(data.safelifeReportCount);
          setFoundItemCount(data.foundItemsReportCount);
          setLostItemCount(data.lostItemsReportCount);
          setCertificateCount(data.certificatesPermitsReportCount);
          setCommunityServicesCount(data.communityServicesReportCount);
         
      
          
        }
        fetchData();
      }, [])


  return (
    <React.Fragment>
      <Cards 
        crimeCount={crimeCount}
        saveLifeCount={saveLifeCount}
        lostCount={lostItemCount}
        foundCount={foundItemCount}
        communityCount={communityServicesCount}
        certificateCount={certificateCount}/>
      <DoughnutChart 
        crimeCount={crimeCount}
        saveLifeCount={saveLifeCount}
        lostCount={lostItemCount}
        foundCount={foundItemCount}
        communityCount={communityServicesCount}
        certificateCount={certificateCount}/>
    </React.Fragment>
  )
}

export default Home
