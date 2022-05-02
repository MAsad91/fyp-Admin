import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import styles from "./LineChart.module.css";

const LineChart = () => {
  return (
    <div className={styles.container}>
      <Line
        data={{
          labels: [
            "Crime Reports",
            "Safe Life Reports",
            "Lost Items Reports",
            "Found Items Reports",
          ],
          datasets: [
            {
              label: "Crime Reports",
              data: [11, 83, 45, 36, 97],
              borderColor: "rgb(153, 10, 10)",
            },
            {
              label: "Safe Life Reports",
              data: [61, 37, 65, 87, 34],
              borderColor: "black",
            },
            {
              label: "Lost Items Reports",
              data: [12, 68, 88, 34, 67],
              borderColor: "rgb(90, 226, 90)",
            },
            {
              label: "Found Items Reports",
              data: [18, 36, 85, 79, 36],
              borderColor: "blue",
            },
          ],
        }}
      />
    </div>
  );
};

export default LineChart;