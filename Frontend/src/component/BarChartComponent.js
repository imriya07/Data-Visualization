import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import LineChart from "./LineChart"; // Ensure this path is correct

const BarChartComponent = ({ filters }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null); // State for selected feature
  const [featureData, setFeatureData] = useState([]); // State to store data for the selected feature

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { age, gender, startDate, endDate } = filters;
        const response = await axios.get(
          "http://localhost:5000/api/analytics",
          {
            params: { age, gender, startDate, endDate },
            withCredentials: true,
          }
        );

        const aggregatedData = response.data.reduce((acc, item) => {
          const feature = item.feature;
          if (acc[feature]) {
            acc[feature] += item.timeSpent;
          } else {
            acc[feature] = item.timeSpent;
          }
          return acc;
        }, {});

        const data = Object.keys(aggregatedData).map((feature) => ({
          name: feature,
          uv: aggregatedData[feature],
        }));

        setChartData(data);
      } catch (err) {
        console.error("Error fetching analytics data", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [filters]);

  const handleBarClick = async (data) => {
    if (data && data.name) {
      setSelectedFeature(data.name); // Set the selected feature
  
      // Fetch detailed data for the selected feature with filters
      try {
        const { age, gender, startDate, endDate } = filters; // Include global filters
        const response = await axios.get(
          "http://localhost:5000/api/analytics/feature",
          {
            params: { feature: data.name, age, gender, startDate, endDate },
            withCredentials: true,
          }
        );
        const featureDetails = response.data;
        setFeatureData(featureDetails); // Set the filtered data for the LineChart
      } catch (err) {
        console.error("Error fetching feature data", err);
        setError(err);
      }
    } else {
      console.error("Invalid data on bar click", data);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (chartData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="row">
      <div className="col-md-6 mt-3">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            layout="vertical" // Set layout to vertical for a horizontal bar chart
            onClick={(e) => handleBarClick(e.activePayload[0].payload)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" /> {/* X-axis for numerical values */}
            <YAxis type="category" dataKey="name" /> {/* Y-axis for feature names */}
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" fill="#0c7399" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="col-md-6 mt-3">
        {selectedFeature && (
          <ResponsiveContainer width="100%">
            <LineChart feature={selectedFeature} data={featureData} />
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default BarChartComponent;
