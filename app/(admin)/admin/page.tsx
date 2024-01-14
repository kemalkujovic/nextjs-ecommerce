import React from "react";
import TitleHeader from "../_components/title-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, Package } from "lucide-react";

const AdminPage = () => {
  return (
    <div className="p-4 mt-2 w-3/4 max-md:w-full mx-auto">
      <TitleHeader title="Dashboard" description="Overview of your store" />
      <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pl-6 pb-3">
              <div className="text-2xl font-bold">$100</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pl-6 pb-3">
              <div className="text-2xl font-bold">+52</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products In Stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pl-6 pb-3">
              <div className="text-2xl font-bold">25</div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
};

export default AdminPage;
