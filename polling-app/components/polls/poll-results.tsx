/**
 * PollResultsChart Component
 *
 * Displays poll results using a chart (e.g., bar or pie).
 * Accepts poll options and vote counts as props.
 */

"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface PollResultsChartProps {
  options: { label: string; votes: number }[];
}

export default function PollResultsChart({ options }: PollResultsChartProps) {
  const data = {
    labels: options.map((opt) => opt.label),
    datasets: [
      {
        label: "Votes",
        data: options.map((opt) => opt.votes),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const config = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="max-w-xl mx-auto">
      <Bar data={data} options={config} />
    </div>
  );
}
