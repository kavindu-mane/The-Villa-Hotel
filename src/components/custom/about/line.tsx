import { FC } from "react"

export const Line: FC = () => {
  return (
    <div className="flex w-full items-center justify-center gap-x-5">
      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
      <div className="my-4 w-1/2 border-t-4 border-emerald-500"></div>
      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
    </div>
  );
}