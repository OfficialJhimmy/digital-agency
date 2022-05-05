import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chart.scss";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// import { Chart } from "react-chartjs-2";
import { Bar, Pie } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend);
// import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ChartComp() {
  const [adsChart, setAdsChart] = useState([]);
  const token = localStorage.getItem("auth_token");

  const authAxios = axios.create({
    baseURL: "https://test.canyousing.com.ng",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetching = async () => {
      const chartData = await authAxios.get("/api/admin/ads");
      console.log(chartData);
      const result = chartData.data;
      console.log(result);
      setAdsChart(result);
    };
    fetching();
  }, []);

  var data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "No of Ads Created",
        // data: chart?.coins?.map((x) => x.price),
        // data: adsChart,
        data: [12, 19, 3, 5, 2, 3, 8, 10, 12, 10, 11, 12],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  var options = {
    // responsive: false,
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  return (
    <div className="chart-container">
      {/* <Bar data={data} height={650} options={options} /> */}
      <Bar
        data={data}
        height={100}
        options={options}
        style={{ display: "block" }}
      />
    </div>
  );
}

export default ChartComp;
