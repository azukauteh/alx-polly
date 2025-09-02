import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface PollResultChartProps {
  data: { name: string; value: number }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PollResultChart({ data }: PollResultChartProps) {
  return (
    <div className="w-full flex justify-center items-center">
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
  );
}
