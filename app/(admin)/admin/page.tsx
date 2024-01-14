"use client";

import React from "react";
import TitleHeader from "../_components/title-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Package } from "lucide-react";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { Overivew } from "@/components/overview";

const AdminPage = () => {
  const [orderQuery, productQuery] = useQueries({
    queries: [
      {
        queryKey: ["Sales count"],
        queryFn: async () => {
          const { data } = await axios.get("/api/orders");
          return data;
        },
      },
      {
        queryKey: ["Stock products"],
        queryFn: async () => {
          const response = await axios.get("/api/product/");
          return response.data;
        },
      },
    ],
  });

  return (
    <div className="p-4 mt-2 w-3/4 max-md:w-full mx-auto">
      <TitleHeader title="Dashboard" description="Overview of your store" />
      <div className="grid gap-4 grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pl-6 pb-3">
            <div className="text-2xl font-bold">
              +{orderQuery?.data?.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Products In Stock
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pl-6 pb-3">
            <div className="text-2xl font-bold">
              {productQuery?.data?.length}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="col-span-4 mt-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Overivew data={[]} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
