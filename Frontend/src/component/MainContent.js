import React from "react";
import BarChart from "./BarChartComponent.js";
import "react-datepicker/dist/react-datepicker.css";

const MainContent = () => {

  return (
    <div className="container">
        <div className="mt-4">
          <h4>Bar Chart Placeholder</h4>
          <BarChart barData={{ labels: [], datasets: [] }} />
        </div>
    </div>
  );
};

export default MainContent;
