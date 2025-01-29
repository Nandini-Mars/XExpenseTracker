import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function PieChartComponent({ data }) {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      // Group expenses by category and sum their values
      const categoryMap = data.reduce((acc, expense) => {
        acc[expense.category] =
          (acc[expense.category] || 0) + Number(expense.price);
        return acc;
      }, {});

      // Convert the grouped data into an array
      const transformedData = Object.entries(categoryMap).map(
        ([key, value]) => ({
          name: key,
          value,
        })
      );

      setPieData(transformedData);
    }
  }, [data]);

  const initialData = [
    { name: "Food", value: 0 },
    { name: "Entertainment", value: 0 },
    { name: "Travel", value: 0 },
  ];

  const COLORS = ["#A000FF", "#FF9304", "#FDE006"];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="App">
      <ResponsiveContainer
        width={300}
        height={300}
        style={{ marginLeft: "25px" }}
      >
        <PieChart width={200} height={200}>
          <Pie
            style={{ color: "#FFFFFF" }}
            data={pieData.length > 0 ? pieData : initialData} // Use transformed data if available
            cx="50%"
            cy="50%"
            outerRadius={80}
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            dataKey="value"
          >
            {(pieData.length > 0 ? pieData : initialData).map(
              (entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              )
            )}
          </Pie>
          <Legend
            iconType="rect"
            style={{ marginTop: -50 }}
            verticalAlign="bottom"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
