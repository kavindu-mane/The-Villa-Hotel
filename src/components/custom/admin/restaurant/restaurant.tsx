"use client";

import { FC, useState } from "react";
import { AdminFoodsDetailsForm, AdminFoodsTable, AdminTablesDetailsForm, AdminTablesTable, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { Provider } from "react-redux";
import { adminStore } from "@/states/stores";

export const AdminRestaurant: FC = () => {
  // state for is loading
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="grid w-full flex-1 items-start gap-4 p-2 md:gap-8 xl:grid-cols-3 xl:gap-4 xl:p-0 2xl:p-2">
      <Provider store={adminStore}>
        <Tabs defaultValue="restaurant">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger
                value="foods"
                className="aria-selected:!bg-primary aria-selected:!text-white"
              >
                Foods
              </TabsTrigger>
              <TabsTrigger
                value="tables"
                className="aria-selected:!bg-primary  aria-selected:!text-white"
              >
                Tables
              </TabsTrigger>
            </TabsList>
          </div>
          {/* rooms table content */}
          <TabsContent value="foods">
            <AdminFoodsTable
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <AdminFoodsDetailsForm isPending={isLoading} />
          </TabsContent>
          <TabsContent value="tables">
            <AdminTablesTable
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <AdminTablesDetailsForm isPending={isLoading} />
          </TabsContent>
        </Tabs>
      </Provider>
    </section>
  );
};
