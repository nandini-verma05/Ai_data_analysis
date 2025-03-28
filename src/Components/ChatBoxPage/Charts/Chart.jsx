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
      const baseColor = [30, 60, 120]; // dark blue shades

      if (chartResponse.multi_value) {
        return {
          labels: labels || [],
          datasets: Object.entries(data || {}).map(([key, values], index) => {
            return {
              label: key.replace(/_/g, " "),
              data: values,
              backgroundColor: `rgba(${30 + index * 40}, ${
                50 + index * 20
              }, 120, 0.8)`,
              borderColor: `rgba(${30 + index * 40}, ${
                50 + index * 20
              }, 180, 1)`,
              borderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7,
              pointBackgroundColor: "#1e3a8a", // dark blue
            };
          }),
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
              pointHoverRadius: 7,
              pointBackgroundColor: "#333chrome",
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
        position: chartType === "pie" ? "right" : "top",
        labels: {
          font: { size: 14, weight: "bold" },
          color: "#1e293b", // slate-800
          boxWidth: 20,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "#1e3a8a",
        titleColor: "#fff",
        bodyColor: "#f8fafc",
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 12 },
        cornerRadius: 6,
        padding: 10,
      },
    },
  };

  const chartOptions = {
    bar: {
      ...commonOptions,
      indexAxis: "x",
      scales: {
        x: {
          ticks: { color: "#1e293b", font: { size: 12 } },
          grid: { color: "#e2e8f0" },
        },
        y: {
          ticks: { color: "#1e293b", font: { size: 12 } },
          grid: { color: "#e2e8f0" },
        },
      },
    },
    line: {
      ...commonOptions,
      elements: {
        line: {
          tension: 0.4,
          borderWidth: 2,
        },
        point: {
          radius: 5,
          hoverRadius: 8,
          backgroundColor: "#1e3a8a",
        },
      },
      scales: {
        x: {
          ticks: { color: "#1e293b", font: { size: 12 } },
          grid: { color: "#e2e8f0" },
        },
        y: {
          ticks: { color: "#1e293b", font: { size: 12 } },
          grid: { color: "#e2e8f0" },
        },
      },
    },
    pie: {
      ...commonOptions,
    },
  };

  const ChartComponent = { line: Line, bar: Bar, pie: Pie }[chartType] || Bar;

  return (
    <div className="w-full flex justify-center items-center bg-white rounded-xl shadow-md p-6">
      {chartType === "pie" ? (
        <div className="flex flex-col md:flex-row w-full gap-10 items-start justify-center">
          <div className="w-full md:w-1/2 h-[400px] flex justify-center items-center">
            <ChartComponent
              key={chartType}
              data={{
                ...chartData,
                datasets: chartData.datasets.map((ds) => ({
                  ...ds,
                  backgroundColor: chartData.labels.map(() => "#1e3a8a"),
                  borderColor: "#fff",
                  borderWidth: 1,
                })),
              }}
              options={{
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.label}: ${context.raw}`;
                      },
                    },
                  },
                  datalabels: {
                    display: false,
                  },
                },
              }}
            />
          </div>

          <div className="w-full md:w-1/2 max-h-[400px] overflow-y-auto px-4 border-l border-gray-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Labels
            </h3>
            <ul className="space-y-3">
              {chartData.labels.map((label, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span
                    className="w-4 h-4 rounded-full inline-block"
                    style={{ backgroundColor: "#1e3a8a" }}
                  ></span>
                  <span className="text-sm text-slate-700 font-medium">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto p-2 rounded-md bg-white">
          <div
            style={{
              width: `${Math.max(1000, chartData.labels.length * 60)}px`,
              height: "400px",
            }}
          >
            {chartData.labels.length  && (
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
