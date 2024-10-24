"use client";

import { FC, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Progress,
} from "@/components";
import Link from "next/link";
import { getStatistics } from "@/actions/admin/statistics";

export const AdminStatistics: FC = () => {
  const [data, setData] = useState<any>({
    lastWeekRevenue: 0,
    lastWeekRevenuePercentage: 0,
    lastMonthRevenue: 0,
    lastMonthRevenuePercentage: 0,
  });

  // fetch statistics data
  useEffect(() => {
    getStatistics()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <Card className="sm:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>The Villa Reservations</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Manage all reservations for the Villa Hotel. Create, accept, and
            reject reservations. View all reservations and analytics in one
            place
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/admin/room-reservations">
            <Button>New Reservation</Button>
          </Link>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>This Week</CardDescription>
          <CardTitle className="text-4xl">
            ${data.lastWeekRevenue.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {data.lastWeekRevenuePercentage.toFixed(2)}% from last week
          </div>
        </CardContent>
        <CardFooter>
          <Progress
            value={data.lastWeekRevenuePercentage}
            aria-label={`${data.lastWeekRevenuePercentage}% increase`}
          />
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-4xl">
            ${data.lastMonthRevenue.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {data.lastMonthRevenuePercentage.toFixed(2)}% from last month
          </div>
        </CardContent>
        <CardFooter>
          <Progress
            value={data.lastMonthRevenuePercentage}
            aria-label={`${data.lastMonthRevenuePercentage}% increase`}
          />
        </CardFooter>
      </Card>
    </div>
  );
};
