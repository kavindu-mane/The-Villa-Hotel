"use client";

import { getFoodsData } from "@/actions/admin/foods-crud";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableNoDataAvailable,
  TableRow,
  TableSkeleton,
} from "@/components";
import { defaultPaginationData } from "@/constants";
import { cn } from "@/lib/utils";
import { setAllFoods, setCurrentFood } from "@/states/admin/foods-slice";
import { AdminState } from "@/states/stores";
import { foodsDataTypes } from "@/types";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

// foods table column headers
const foodsTableHeaders = [
  {
    name: "Food ID",
    className: "",
  },
  {
    name: "Food Type",
    className: "hidden sm:table-cell",
  },
  {
    name: "Name",
    className: "hidden sm:table-cell",
  },
  {
    name: "Description",
    className: "hidden sm:table-cell",
  },
  {
    name: "Price(USD)",
    className: "text-right",
  },
];

export const AdminFoodsTable: FC<{
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}> = ({ isLoading, setIsLoading }) => {
  const params = useSearchParams();
  const page = params.get("page") || "1";
  // is error
  const [isError, setIsError] = useState(false);
  // dispatcher
  const dispatch = useDispatch();
  const foods = useSelector((state: AdminState) => state.foods_admin);
  const [foodId, setFoodId] = useState<string>("new");
  const [paginationData, setPaginationData] = useState(defaultPaginationData);

  // load foods data
  const loadFoodsData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    const pageInt = isNaN(Number(page)) ? 1 : Number(page);
    // fetch foods data from the server
    await getFoodsData(pageInt)
      .then((data) => {
        if (data?.foods) {
          dispatch(setAllFoods(data.foods as foodsDataTypes[]));
          setPaginationData({
            totalPages: data?.totalPages,
            currentPage: data?.currentPage,
          });
        }
        if (data?.error) {
          setIsError(true);
          dispatch(setAllFoods(null));
          setPaginationData(defaultPaginationData);
        }
      })
      .catch(() => {
        setIsError(true);
        dispatch(setAllFoods(null));
        setPaginationData(defaultPaginationData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, page, setIsLoading]);

  // load foods data on component mount
  useEffect(() => {
    loadFoodsData();
  }, [loadFoodsData]);

  // change set data
  useEffect(() => {
    if (foods.all && foodId) {
      const food = foods.all.find((food) => food.foodId === foodId);
      if (food) {
        dispatch(setCurrentFood(food));
      } else {
        dispatch(setCurrentFood(null));
      }
    }
  }, [dispatch, foodId, foods]);

  return (
    <Card className="overflow-hidden xl:col-span-2">
      <CardHeader>
        <div className="flex w-full justify-between">
          <div className="">
            <CardTitle className="text-lg">Foods Data</CardTitle>
            <CardDescription>Foods details of The Villa Hotel.</CardDescription>
          </div>

          <Button variant="default" onClick={() => setFoodId("new")}>
            Add Food
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-hidden px-5">
        {/*  if foods are not available  */}
        {(foods.all?.length == 0 || foods.all == null) &&
          !isLoading &&
          !isError && <TableNoDataAvailable />}

        {/* is error occurred */}
        {isError && (
          <div className="flex flex-col items-center justify-center text-center text-red-500">
            <BiSolidError className="h-20 w-20" />
            Failed to load foods data!
          </div>
        )}

        {/* if foods data are loading */}
        {isLoading && <TableSkeleton />}

        {/* if foods data are available */}
        {foods.all && foods.all?.length > 0 && !isLoading && (
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                {foodsTableHeaders.map((header) => (
                  <TableHead key={header.name} className={header.className}>
                    {header.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-hidden">
              {foods.all.map((data, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    "cursor-pointer",
                    data.foodId.toString() === foodId ? "bg-emerald-100" : "",
                  )}
                  onClick={() => setFoodId(data.foodId.toString())}
                >
                  <TableCell className="">
                    <div className="font-medium">{data?.foodId}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="default">
                      {data?.foodType.replaceAll("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {data?.name}
                  </TableCell>
                  <TableCell className="hidden max-w-96 sm:table-cell xl:max-w-80 2xl:max-w-96">
                    <p className="w-full truncate">{data?.description}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    $ {data?.price.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* pagination */}
        {foods.all && foods.all?.length > 0 && !isLoading && (
          <div className="flex w-full justify-end pt-5">
            <Pagination className="flex w-full justify-end pt-5">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    isActive={paginationData.currentPage === 1}
                    href={`/admin/restaurant?&page=${isNaN(Number(page)) ? 1 : Number(page) - 1}`}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    isActive={
                      paginationData.currentPage === paginationData.totalPages
                    }
                    href={`/admin/restaurant?&page=${isNaN(Number(page)) ? 1 : Number(page) + 1}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
