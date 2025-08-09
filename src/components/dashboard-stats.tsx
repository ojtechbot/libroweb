
"use client";

import { useMemo } from "react";
import type { Book } from "@/lib/data";
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell, ResponsiveContainer, YAxis, Tooltip } from "recharts";
import {
  ChartContainer,
  ChartTooltip as ChartTooltipComponent,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardStatsProps {
  borrowedBooks: Book[];
  favoriteBooks: Book[];
  borrowingHistory: Book[];
  isLoading?: boolean;
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function DashboardStats({
  borrowedBooks,
  favoriteBooks,
  borrowingHistory,
  isLoading = false,
}: DashboardStatsProps) {
  const isMobile = useIsMobile();
  
  // Process category data
  const categoryData = useMemo(() => {
    const categoryCount: Record<string, number> = {};
    [...borrowedBooks, ...borrowingHistory].forEach((book) => {
      if (!book?.category) return;
      categoryCount[book.category] = (categoryCount[book.category] || 0) + 1;
    });

    return Object.entries(categoryCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [borrowedBooks, borrowingHistory]);

  // Process overview data
  const overviewData = useMemo(() => [
    { type: "Borrowed", count: borrowedBooks.length, fill: "var(--color-borrowed)" },
    { type: "Favorites", count: favoriteBooks.length, fill: "var(--color-favorites)" },
    { type: "History", count: borrowingHistory.length, fill: "var(--color-history)" },
  ], [borrowedBooks, favoriteBooks, borrowingHistory]);

  // Chart configurations
  const chartConfig: ChartConfig = {
    count: { label: "Count" },
    borrowed: { label: "Borrowed", color: "hsl(var(--chart-1))" },
    favorites: { label: "Favorites", color: "hsl(var(--chart-2))" },
    history: { label: "History", color: "hsl(var(--chart-3))" },
  };
  
  const categoryChartConfig = useMemo(() => {
    return categoryData.reduce((acc, category, index) => {
      acc[category.name] = {
        label: category.name,
        color: COLORS[index % COLORS.length]
      };
      return acc;
    }, {} as ChartConfig);
  }, [categoryData]);


  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        <Skeleton className="h-[350px] w-full" />
        <Skeleton className="h-[350px] w-full" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Activity Overview</CardTitle>
          <CardDescription>A summary of your library interactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart
              accessibilityLayer
              data={overviewData}
              layout="vertical"
              margin={{ left: 10, right: 10 }}
            >
              <YAxis
                dataKey="type"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => chartConfig[value.toLowerCase()]?.label}
              />
              <XAxis dataKey="count" type="number" hide />
              <Tooltip cursor={{ fill: "hsl(var(--muted))" }} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="count" layout="vertical" radius={5} barSize={32}>
                 {overviewData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
          <CardDescription>Your favorite genres at a glance.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={categoryChartConfig} className="h-[300px] w-full">
            <PieChart>
              <Tooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? 80 : 100}
                innerRadius={isMobile ? 50 : 60}
                paddingAngle={2}
                labelLine={false}
                label={isMobile ? undefined : ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={`var(--color-${entry.name})`} />
                ))}
              </Pie>
              {isMobile && <ChartLegend content={<ChartLegendContent nameKey="name" />} />}
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
