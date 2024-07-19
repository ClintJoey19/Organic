"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { months } from "@/lib/utils";
import { Product } from "../admin/products/ProductsTable";

interface ProductsSoldChartProps {
  data: Product[];
  month: number;
  year: number;
}

export function ProductsSoldChart({
  data,
  month,
  year,
}: ProductsSoldChartProps) {
  const currentMonth = `${months[month]}, ${year}`;
  const chartData = data.map(({ name, sold }) => {
    const fill = `var(--color-${name.toLowerCase()})`;
    return {
      product: name.toLowerCase(),
      sold,
      fill,
    };
  });
  let chartConfig = {
    sold: {
      label: "Sold",
    },
  } satisfies ChartConfig;

  data.forEach((item, i) => {
    chartConfig = {
      ...chartConfig,
      [item.name.toLowerCase()]: {
        label: item.name,
        color: `hsl(var(--chart-${i}))`,
      },
    };
  });

  console.log(chartData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products Sold</CardTitle>
        <CardDescription>{currentMonth}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            layout="vertical"
            data={chartData}
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="product"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="sold" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="sold" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
