"use client";

import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  TooltipContent,
  Button,
  Label,
  RadioGroup,
  RadioGroupItem,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  Badge,
} from "@/components";
import { offerDataTypes, tableReservationOrderSummery } from "@/types";
import { format } from "date-fns";
import { BiCheck } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";
import { ClipLoader } from "react-magic-spinners";

export const OrderSummary: FC<{
  setCurrentStep: Dispatch<SetStateAction<number>>;
  orderSummary: tableReservationOrderSummery | null;
  offers: offerDataTypes[] | null;
  onCompleteTableReservation: (offerId?: string) => void;
  isLoading: boolean;
}> = ({
  setCurrentStep,
  orderSummary,
  onCompleteTableReservation,
  offers,
  isLoading,
}) => {
  const [offer, setOffer] = useState<offerDataTypes | null>(null);
  const [total, setTotal] = useState<string>("0");
  const [subTotal, setSubTotal] = useState<string>("0");
  // function to calculate total cost
  const calculateTotalCost = useCallback(() => {
    let total = 0;
    orderSummary?.foodReservation[0]?.foodReservationItems?.forEach((item) => {
      total += item.total;
    });
    total += orderSummary?.total || 0;
    setTotal(total.toFixed(2));
  }, [orderSummary]);

  // function for calculate sub total
  const calculateSubTotal = useCallback(() => {
    let totalInNum = parseFloat(total);
    if (!offer) {
      setSubTotal(total);
      return;
    }
    totalInNum = totalInNum - (totalInNum * offer?.discount) / 100;
    setSubTotal(totalInNum.toFixed(2));
  }, [offer, total]);

  // calculate sub total
  useEffect(() => {
    calculateSubTotal();
  }, [calculateSubTotal]);

  useEffect(() => {
    calculateTotalCost();
  }, [calculateTotalCost]);

  return (
    <section className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col gap-2 lg:flex-row">
        {/* left side */}
        <div className="flex w-full flex-col items-center justify-start pb-10 lg:w-1/2 lg:items-start lg:border-r lg:px-3">
          {/* title */}
          <h2 className="mb-6 text-xl font-medium">Reservation Information</h2>
          {/* details */}
          <div className="flex w-full flex-col items-start justify-center gap-3">
            <div className="flex w-full items-center justify-between">
              <span>Name</span>
              <span>{orderSummary?.name}</span>
            </div>
            <div className="flex w-full items-center justify-between">
              <span>Phone</span>
              <span>{orderSummary?.phone}</span>
            </div>
            <div className="flex w-full items-center justify-between">
              <span>Email</span>
              <span>{orderSummary?.email}</span>
            </div>
            <div className="flex w-full items-center justify-between">
              <span>Date</span>
              <span>{format(orderSummary?.date!!, "LLL dd, y")}</span>
            </div>
            <div className="flex w-full items-center justify-between">
              <span>Time Slot</span>
              <span>{orderSummary?.timeSlot}</span>
            </div>
            <div className="flex w-full items-center justify-between">
              <span>Table</span>
              <span>
                {orderSummary?.table.tableId}(
                {orderSummary?.table.tableType.replaceAll("_", " ")})
              </span>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="flex w-full flex-col items-center justify-start pb-10 lg:w-1/2 lg:items-end lg:px-3">
          <h2 className="mb-6 text-xl font-medium">Billing Information</h2>

          {/* items details */}
          <div className="mb-3 flex w-full flex-col items-start justify-start gap-2">
            {/* topic for foods */}
            {orderSummary?.foodReservation[0]?.foodReservationItems && (
              <div className="mb-3 flex w-full items-center justify-between gap-2 text-slate-900">
                <p className="">Foods</p>
                <p className="">
                  (
                  {
                    orderSummary?.foodReservation[0]?.foodReservationItems
                      .length
                  }
                  )
                </p>
              </div>
            )}
            {orderSummary?.foodReservation[0]?.foodReservationItems?.map(
              (item, index) => (
                <div
                  key={index}
                  className="flex w-full items-center justify-between gap-2 border-b py-1"
                >
                  <div className="">
                    <p className="text-sm italic text-gray-500">
                      {item.foodId}
                    </p>
                    <p className="text-gray-500">{item.food.name}</p>
                  </div>
                  <div className="text-end">
                    <p className="text-gray-500">x{item.quantity}</p>
                    <p className="text-gray-800">${item.total}</p>
                  </div>
                </div>
              ),
            )}
            <div className="mb-3 flex w-full items-center justify-between gap-2">
              <p className="text-slate-900">Table </p>
              <p className="text-slate-900">
                {orderSummary?.total === 0 ? (
                  <Badge color="primary">Free</Badge>
                ) : (
                  `$${orderSummary?.total}`
                )}
              </p>
            </div>
          </div>

          {/* coins */}
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center justify-center gap-x-1 text-gray-500">
              Coins
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <FaInfoCircle className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="border bg-white shadow-md drop-shadow-md">
                    <div className="max-w-xs text-slate-900">
                      Coins are kind of loyalty points that you can use to get
                      discounts on your next reservation. If you are have a
                      account with us, you can earn coins by making
                      reservations. All reservations will earn 1% of the total
                      amount as coins. 100 coin is equal to one dollar.
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-gray-800">0</p>
          </div>

          {/* available offers */}
          <div className="flex w-full flex-col gap-2">
            <p className="text-gray-500">Offers</p>

            <RadioGroup
              onValueChange={(value) => {
                setOffer(offers?.find((offer) => offer.code === value) || null);
              }}
              value={offer?.code}
              className="flex w-full flex-wrap gap-2"
            >
              {offers?.map((promotion, index) => (
                <Label key={index} className="w-full">
                  <RadioGroupItem
                    accessKey="offerID"
                    value={promotion.code}
                    className="peer sr-only"
                  />
                  <div
                    className={`relative flex w-full cursor-pointer flex-col gap-y-1 rounded-lg ${promotion.code === offer?.code ? "bg-primary" : "bg-cyan-600"} p-5 text-start font-normal text-white shadow-md`}
                  >
                    <p className="">Offer Code : {promotion.code}</p>
                    <p className="">
                      Valid Till : {format(promotion.validTo, "LLL dd, y")}
                    </p>
                    <div className="absolute right-2 flex items-center gap-x-2">
                      <p className="text-2xl font-medium">
                        {promotion.discount}% Off
                      </p>
                      <BiCheck
                        className={`h-6 w-6 ${offer?.code === promotion.code ? "flex" : "hidden"} rounded-full bg-white font-bold text-primary`}
                      />
                    </div>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </div>

          {/* balance */}
          <div className="mt-5 flex w-full flex-col items-start justify-start gap-2 border-t border-dashed border-slate-500 pt-5">
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-gray-500">Total</p>
              <p className="text-gray-800">${total}</p>
            </div>

            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-gray-500">Sub Total</p>
              <p className="text-gray-800">${subTotal}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        {/* Back button */}
        <Button
          onClick={() => setCurrentStep(3)}
          className="flex h-10 w-full max-w-48 items-center justify-center gap-x-2 border border-primary bg-transparent text-primary hover:text-white"
        >
          Previous
        </Button>

        <Button
          onClick={() => onCompleteTableReservation(offer?.code)}
          className="flex h-10 w-full max-w-48 items-center justify-center gap-x-2"
        >
          {isLoading && <ClipLoader size={20} color="#fff" />}
          Confirm Reservation
        </Button>
      </div>
    </section>
  );
};
