import { useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";

type ChartDisplayProps = {
  type: string;
};

export default function ChartDisplay({ type }: ChartDisplayProps) {
  const data = {
    labels: ["Option A", "Option B", "Option C"],
    datasets: [
      {
        label: "Votes",
        data: [12, 19, 7],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      {type == "bar" && <Bar data={data} options={options} />}
      {type == "pie" && <Pie data={data} options={options} />}
      {type == "line" && <Line data={data} options={options} />}
    </div>
  );
}
