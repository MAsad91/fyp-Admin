import React, { useCallback, useContext, UseContext, useEffect, useState} from 'react';
import Cards from '../components/cards/Cards';
import LineChart from '../components/charts/LineChart'; 
function Home() {
  const[count, setCount] = useState([]);

  useEffect(() =>{
    const fetchData = async () => {
      const data = await fetch('http://localhost:5000/home');
      const jsonData = data.json();
  
      setCount(jsonData);
    }
    fetchData();
  }, [])
  

  console.log(count);
  return (
    <React.Fragment>
      <Cards {...count}/>
      <LineChart />
    </React.Fragment>
  )
}

export default Home



// export const fetchDailyData = async () => {
//   try {
//       const {data} = await axios.get(`${url}/daily`);
//       const modifiedData = data.map((dailyData) => ({
//           confirmed:dailyData.confirmed.total,
//           deaths: dailyData.deaths.total,
//           date: dailyData.reportDate,
//       }) );
//       return modifiedData;
//   } catch (error) {
      
// }
// }