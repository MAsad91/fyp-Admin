import React from 'react';
import Cards from '../components/cards/Cards';
import LineChart from '../components/charts/LineChart'; 
function Home() {
  return (
    <React.Fragment>
      <Cards />
      <LineChart />
    </React.Fragment>
  )
}

export default Home