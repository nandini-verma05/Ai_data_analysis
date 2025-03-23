import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Chart = ({ chartResponse, chartType }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (!chartResponse?.labels || !chartResponse?.data) {
      console.warn("Invalid chart response.");
      return;
    }

    setChartData(() => {
      const { labels, data } = chartResponse;
      if (chartResponse.multi_value) {
        return {
          labels: labels || [],
          datasets: Object.entries(data || {}).map(([key, values], index) => ({
            label: key.replace(/_/g, " "),
            data: values,
            backgroundColor: `rgba(${30 + index * 40}, ${
              50 + index * 20
            }, 120, 0.8)`,
            borderColor: `rgba(${30 + index * 40}, ${50 + index * 20}, 180, 1)`,
            borderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: "#333",
          })),
        };
      } else {
        return {
          labels: labels,
          datasets: [
            {
              label: "Data",
              data: data || [],
              backgroundColor: "rgba(0, 80, 180, 0.8)",
              borderColor: "rgba(0, 80, 180, 1)",
              borderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 8,
              pointBackgroundColor: "#333",
            },
          ],
        };
      }
    });
  }, [chartResponse]);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14, weight: "bold" },
          color: "#333",
        },
      },
      tooltip: {
        backgroundColor: "#555",
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 12 },
        cornerRadius: 5,
        padding: 10,
      },
    },
  };

  const chartOptions = {
    bar: {
      ...commonOptions,
      indexAxis: "x",
      scales: {
        x: { ticks: { color: "#333" }, grid: { color: "#ddd" } },
        y: { ticks: { color: "#333" }, grid: { color: "#ddd" } },
      },
    },
    line: {
      ...commonOptions,
      elements: { line: { tension: 0.3 } },
      scales: {
        x: { ticks: { color: "#333" }, grid: { color: "#ddd" } },
        y: { ticks: { color: "#333" }, grid: { color: "#ddd" } },
      },
    },
    pie: {
      ...commonOptions,
    },
  };

  const ChartComponent = { line: Line, bar: Bar, pie: Pie }[chartType] || Bar;

  return (
    <div className="w-[56rem] flex justify-center items-center bg-white rounded-xl shadow-lg">
      {chartType === "pie" ? (
        <div className="w-[400px] h-[200px] flex justify-center items-center">
          <ChartComponent
            key={chartType}
            data={chartData}
            options={chartOptions[chartType]}
          />
        </div>
      ) : (
        <div className="w-full max-w-4xl overflow-x-auto bg-white p-4 rounded-lg">
          <div
            style={{
              width: `${Math.max(1000, chartData.labels.length * 50)}px`,
              height: "300px",
            }}
          >
            {chartData.labels.length && (
              <ChartComponent
                key={chartType}
                data={chartData}
                options={chartOptions[chartType]}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;
