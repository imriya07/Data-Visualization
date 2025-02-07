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
import zoomPlugin from "chartjs-plugin-zoom"; // Import zoom plugin

// Registering the necessary elements for the chart
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  zoomPlugin // Register zoom plugin
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
  }, [feature, data]); // Trigger this effect whenever feature or data changes
  

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
            enabled: true, // Enable zooming with the mouse wheel
          },
          pinch: {
            enabled: true, // Enable zooming with pinch gestures
          },
          mode: "x", // Allow zooming on the x-axis
        },
        pan: {
          enabled: true, // Enable panning
          mode: "x", // Allow panning on the x-axis
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
