import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
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
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [featureData, setFeatureData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { age, gender, startDate, endDate } = filters;
        const response = await axios.get(
          "https://backend-theta-plum-15.vercel.app/api/analytics",
          {
            params: { age, gender, startDate, endDate },
            withCredentials: true,
          }
        );

        const aggregatedData = response.data.reduce((acc, item) => {
          acc[item.feature] = (acc[item.feature] || 0) + item.timeSpent;
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
      setSelectedFeature(data.name);
      try {
        const { age, gender, startDate, endDate } = filters;
        const response = await axios.get(
          "https://backend-theta-plum-15.vercel.app/analytics/feature",
          {
            params: { feature: data.name, age, gender, startDate, endDate },
            withCredentials: true,
          }
        );
        setFeatureData(response.data);
      } catch (err) {
        console.error("Error fetching feature data", err);
        setError(err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;
  if (chartData.length === 0) return <div>No data available</div>;

  return (
    <div className="row">
      {/* Bar Chart */}
      <div className="col-md-6 col-12 mt-3">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            layout="vertical"
            onClick={(e) => e.activePayload && handleBarClick(e.activePayload[0].payload)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" fill="#0c7399" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart (Same height & width as BarChart) */}
      <div className="col-md-6 col-12 line">
        {selectedFeature && (
          <ResponsiveContainer>
            <LineChart feature={selectedFeature} data={featureData} />
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default BarChartComponent;
