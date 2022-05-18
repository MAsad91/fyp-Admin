import React from "react";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

import styles from "./DoughnutChart.module.css";

const DoughnutChart = (props) => {
  return (
    <div className={styles.container}>
      <Doughnut
        data={{
          labels: [
            "Crime Reports",
            "Safe Life Reports",
            "Lost Items Reports",
            "Found Items Reports",
            "Community Services Reports",
            "Certificate And Permits Request",
            
          ],
          datasets: [
            {
              label: "Reports",
              data:[
                props.crimeCount,
                props.saveLifeCount,
                props.lostCount,
                props.foundCount,
                props.communityCount,
                props.certificateCount
              ],
              backgroundColor: [
                "rgb(220,20,60)",
                "rgb(0,255,0)",
                "rgb(0,0,0)",
                "rgb(255, 255, 62)",
                "rgb(153, 150, 0)",
                "rgb(0,153,100)"
              ],
              hoverOffset: 4,
            },
          ],
        }}
      />
    </div>
  );
};

export default DoughnutChart;