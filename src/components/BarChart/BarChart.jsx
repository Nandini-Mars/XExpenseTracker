import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

export default function BarChartComponent({ expenses }) {
  // Aggregate expense data by category
  const aggregatedData = expenses.reduce((acc, expense) => {
    const category = expense.category;
    const price = Number(expense.price);

    const existingCategory = acc.find((item) => item.name === category);
    if (existingCategory) {
      existingCategory.value += price;
    } else {
      acc.push({ name: category, value: price });
    }

    return acc;
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart layout="vertical" data={aggregatedData}>
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
