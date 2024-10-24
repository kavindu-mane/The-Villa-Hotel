"use server";

import { db } from "@/lib/db";

export const getStatistics = async () => {
  try {
    // get last week's revenue
    const lastWeekRevenue = await db.payments.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    });

    // get last month's revenue
    const lastMonthRevenue = await db.payments.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    });

    // get week before last week's revenue
    const weekBeforeLastWeekRevenue = await db.payments.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 14)),
          lt: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    });

    // get month before last month's revenue
    const monthBeforeLastMonthRevenue = await db.payments.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 2)),
          lt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    });

    // calculate percentage increase/decrease as compared to last week
    const lastWeekRevenueAmount = (lastWeekRevenue as any)?._sum?.amount || 0;
    const weekBeforeLastWeekRevenueAmount =
      (weekBeforeLastWeekRevenue as any)?._sum?.amount || 0;
    const weekRevenueDifference =
      lastWeekRevenueAmount - weekBeforeLastWeekRevenueAmount;
    const weekRevenuePercentage =
      (weekRevenueDifference / weekBeforeLastWeekRevenueAmount) * 100;

    // calculate percentage increase/decrease as compared to last month
    const lastMonthRevenueAmount = (lastMonthRevenue as any)?._sum?.amount || 0;
    const monthBeforeLastMonthRevenueAmount =
      (monthBeforeLastMonthRevenue as any)?._sum?.amount || 0;
    const monthRevenueDifference =
      lastMonthRevenueAmount - monthBeforeLastMonthRevenueAmount;
    const monthRevenuePercentage =
      (monthRevenueDifference / monthBeforeLastMonthRevenueAmount) * 100;

    return {
      lastWeekRevenue: lastWeekRevenueAmount,
      lastWeekRevenuePercentage: weekRevenuePercentage,
      lastMonthRevenue: lastMonthRevenueAmount,
      lastMonthRevenuePercentage: monthRevenuePercentage,
    };
  } catch (e) {
    return {
      error: "An error occurred while fetching statistics",
    };
  }
};
