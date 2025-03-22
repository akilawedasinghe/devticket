
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell, TooltipProps, LineChart, Line } from "recharts";

interface TicketChartProps {
  data: any[];
  type: "bar" | "pie" | "line";
  title: string;
  description?: string;
  className?: string;
  style?: React.CSSProperties;
  darkLabels?: boolean;
}

export function TicketChart({ data, type, title, description, className, style, darkLabels = true }: TicketChartProps) {
  // Colors for different chart elements
  const COLORS = ["#3b82f6", "#8b5cf6", "#22c55e", "#f59e0b", "#ef4444"];

  // Customized Label for Pie Chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill={darkLabels ? "black" : "white"} 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg shadow-lg">
          {type === "bar" && (
            <p className="text-slate-300 text-sm font-medium mb-1">{`${label}`}</p>
          )}
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-slate-200 text-xs">
                {`${entry.name}: ${entry.value}`}
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={`overflow-hidden backdrop-blur-sm bg-white/5 border-0 shadow-xl hover:shadow-2xl transition-all ${className}`} style={style}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-slate-900 dark:text-white">{title}</CardTitle>
        {description && <CardDescription className="text-slate-600 dark:text-slate-400">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-[240px] w-full">
          {type === "bar" ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: "#000000" }} 
                  tickLine={{ stroke: "#cbd5e1" }}
                  axisLine={{ stroke: "#cbd5e1" }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: "#000000" }} 
                  tickLine={{ stroke: "#cbd5e1" }}
                  axisLine={{ stroke: "#cbd5e1" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{
                    paddingTop: 15,
                    fontSize: 12,
                    color: "#000000",
                  }}
                />
                {Object.keys(data[0] || {})
                  .filter((key) => key !== "name")
                  .map((key, index) => (
                    <Bar
                      key={key}
                      dataKey={key}
                      fill={COLORS[index % COLORS.length]}
                      radius={[4, 4, 0, 0]}
                    />
                  ))}
              </BarChart>
            </ResponsiveContainer>
          ) : type === "line" ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: "#000000" }} 
                  tickLine={{ stroke: "#cbd5e1" }}
                  axisLine={{ stroke: "#cbd5e1" }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: "#000000" }} 
                  tickLine={{ stroke: "#cbd5e1" }}
                  axisLine={{ stroke: "#cbd5e1" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{
                    paddingTop: 15,
                    fontSize: 12,
                    color: "#000000",
                  }}
                />
                {Object.keys(data[0] || {})
                  .filter((key) => key !== "name")
                  .map((key, index) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={COLORS[index % COLORS.length]}
                      activeDot={{ r: 8 }}
                    />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  label={renderCustomizedLabel}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{
                    paddingTop: 15,
                    fontSize: 12,
                    color: "#000000",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
