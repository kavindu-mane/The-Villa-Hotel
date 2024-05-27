"use client";

import { getPromotionsData } from "@/actions/admin/promotions-crud";
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
import { cn } from "@/lib/utils";
import { setAllPromotions, setCurrentPromotion } from "@/states/admin";
import { AdminState } from "@/states/stores";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

// rooms table column headers
const promotionsTableHeaders = [
  {
    name: "Code",
    className: "",
  },
  {
    name: "Discount",
    className: "hidden sm:table-cell",
  },
  {
    name: "Description",
    className: "hidden sm:table-cell",
  },
  {
    name: "Valid From",
    className: "hidden sm:table-cell",
  },
  {
    name: "Valid To",
    className: "text-right",
  },
];

export const AdminPromotionsTable: FC<{
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}> = ({ isLoading, setIsLoading }) => {
  const params = useSearchParams();
  const page = params.get("page") || "1";
  // is error
  const [isError, setIsError] = useState(false);
  // dispatcher
  const dispatch = useDispatch();
  const promotions = useSelector((state: AdminState) => state.promotions_admin);
  const [promotionsId, setPromotionsId] = useState<string>("new");

  // load promotions data
  const loadPromotionsData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    const pageInt = isNaN(Number(page)) ? 1 : Number(page);
    // fetch promotions data from the server
    await getPromotionsData(pageInt)
      .then((data) => {
        if (data?.promotions) {
          dispatch(setAllPromotions(data?.promotions));
        }
        if (data?.error) {
          setIsError(true);
          dispatch(setAllPromotions(null));
        }
      })
      .catch(() => {
        setIsError(true);
        dispatch(setAllPromotions(null));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, page, setIsLoading]);

  // load promotions data on component mount
  useEffect(() => {
    loadPromotionsData();
  }, [loadPromotionsData]);

  // change set data
  useEffect(() => {
    if (promotions.all && promotionsId) {
      const promotion = promotions.all.find(
        (promotion) => promotion.id === promotionsId,
      );
      if (promotion) {
        dispatch(setCurrentPromotion(promotions));
      } else {
        dispatch(setCurrentPromotion(null));
      }
    }
  }, [dispatch, promotionsId, promotions]);

  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <div className="flex w-full justify-between">
          <div className="">
            <CardTitle className="text-lg">Promotions Data</CardTitle>
            <CardDescription>
              Promotional offers details of The Villa Hotel.
            </CardDescription>
          </div>

          <Button variant="default" onClick={() => setPromotionsId("new")}>
            Add Reservations
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-5">
        {/*  if promotions are not available  */}
        {(promotions.all?.length == 0 || promotions.all == null) &&
          !isLoading &&
          !isError && <TableNoDataAvailable />}

        {/* is error occurred */}
        {isError && (
          <div className="flex flex-col items-center justify-center text-center text-red-500">
            <BiSolidError className="h-20 w-20" />
            Failed to load rooms reservation data!
          </div>
        )}

        {/* if promotions data are loading */}
        {isLoading && <TableSkeleton />}

        {/* if promotions data are available */}
        {promotions.all && promotions.all?.length > 0 && !isLoading && (
          <Table>
            <TableHeader>
              <TableRow>
                {promotionsTableHeaders.map((header) => (
                  <TableHead key={header.name} className={header.className}>
                    {header.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotions.all.map((data, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    "cursor-pointer",
                    data.id === promotionsId ? "bg-emerald-100" : "",
                  )}
                  onClick={() => setPromotionsId(data.id)}
                >
                  <TableCell>
                    <div className="font-medium">{data?.code}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="default">{data?.discount}%</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {data?.description}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {format(data?.validFrom, "LLL dd, y")}
                  </TableCell>
                  <TableCell className="text-right">
                    {format(data?.validTo, "LLL dd, y")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* pagination */}
        {promotions.all && promotions.all?.length > 0 && !isLoading && (
          <div className="flex w-full justify-end pt-5">
            <Pagination className="flex w-full justify-end pt-5">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`/admin/promotions?&page=${isNaN(Number(page)) ? 1 : Number(page) - 1}`}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href={`/admin/promotions?&page=${isNaN(Number(page)) ? 1 : Number(page) + 1}`}
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
