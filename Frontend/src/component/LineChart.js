import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom"; 

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  zoomPlugin 
);

const LineChart = ({ feature, data }) => {
  const [timeTrendData, setTimeTrendData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchFeatureData = async () => {
      try {
        if (data && data.length > 0) { 
          setTimeTrendData(data.map((item) => item.timeSpent));
          setLabels(data.map((item) => item.startDate));
        } else {
          console.warn("No data available for the feature or filters");
        }
      } catch (err) {
        console.error("Error fetching data for feature", err);
      }
    };
  
    fetchFeatureData();
  }, [feature, data]); //  this effect will triger whenever feature or data changes
  

  const lineData = {
    labels: labels,
    datasets: [
      {
        label: `Time Trend for ${feature || "All Features"}`,
        data: timeTrendData,
        borderColor: "rgba(25, 132, 197, 1)",
        backgroundColor: "#0c7399",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Start Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Time Spent",
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true, 
          },
          pinch: {
            enabled: true,
          },
          mode: "x", 
        },
        pan: {
          enabled: true, 
          mode: "x", 
        },
      },
    },
  };

  if (timeTrendData.length === 0) {
    return <div>No data available for this feature</div>;
  }

  return <Line data={lineData} options={options} height={185} />;
};

export default LineChart;
