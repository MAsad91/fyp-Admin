import axios from "axios";
import React, {
  useCallback,
  useContext,
  UseContext,
  useEffect,
  useState,
} from "react";
import Cards from "../components/cards/Cards";
import DoughnutChart from "../components/charts/DoughnutChart";
function Home() {
  const [userCount, setUserCount] = useState();
  const [propertyCount, setPropertyCount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:5000/home/");
      console.log(data.authCount);
      setUserCount(data.authCount);
      setPropertyCount(data.propertyCount);
      
    };
    fetchData();
    console.log(userCount, propertyCount);
  }, []);

  return (
    <React.Fragment>
      <Cards
        userCount={userCount}
        propertyCount={propertyCount}
       
      />
      {/* <DoughnutChart
       userCount={userCount}
       propertyCount={propertyCount}
      /> */}
    </React.Fragment>
  );
}

export default Home;
