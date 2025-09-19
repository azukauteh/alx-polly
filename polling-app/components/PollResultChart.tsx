import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface PollResultChartProps {
  data: { name: string; value: number }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

/**
 * PollResultChart Component
 *
 * Displays poll results using a responsive pie chart.
 * Wrapped in a scrollable container for mobile compatibility.
 * Includes accessible role and label for screen readers.
 */

export default function PollResultChart({ data }: PollResultChartProps) {
  return (
    <div
      role="img"
      aria-label="Poll results chart"
      className="w-full overflow-auto px-2"
    >
      <div className="min-w-[320px] max-w-full flex justify-center items-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
