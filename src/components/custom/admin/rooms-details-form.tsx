"use client";

import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components";
import { FC } from "react";
import { FaCopy } from "react-icons/fa";

export const AdminRoomsDetailsForm: FC = () => {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Order Oe31b70H
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <FaCopy className="h-3 w-3" />
                <span className="sr-only">Copy Order ID</span>
              </Button>
            </CardTitle>
            <CardDescription>Date: November 23, 2023</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
