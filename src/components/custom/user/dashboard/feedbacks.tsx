"use client";

import { addReview } from "@/actions/user/reviews";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  Textarea,
} from "@/components";
import { useToast } from "@/components/ui/use-toast";
import { FC, useState } from "react";
import { FaStar } from "react-icons/fa";

export const AddFeedbacks: FC<{
  id: string;
  isRoom: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  getData: () => void;
}> = ({ id, isRoom, isOpen, setIsOpen, getData }) => {
  const [rating, setRating] = useState({
    feedback: "",
    rating: 1,
  });
  const [validationErrors, setValidationErrors] = useState({
    feedback: "",
    rating: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setLoading(true);
    await addReview(rating, id, isRoom)
      .then((data) => {
        if (data.error) {
          toast({
            title: data.error,
            description: new Date().toLocaleTimeString(),
            className: "bg-red-500 border-primary rounded-md text-white",
          });
        } else {
          setIsOpen(false);
          getData();
          toast({
            title: "Review added successfully",
            description: new Date().toLocaleTimeString(),
            className: "bg-green-500 border-primary rounded-md text-white",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Failed to add feedback",
          description: new Date().toLocaleTimeString(),
          className: "bg-green-500 border-primary rounded-md text-white",
        });
      })

      .finally(() => {
        setLoading(false);
        setRating({
          feedback: "",
          rating: 1,
        });
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            {isRoom ? "Room" : "Table"} Reservation Feedback
          </DialogTitle>
          <DialogDescription className="text-xs font-medium">
            Please provide your feedback about the your experience
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {/* ratings stars */}
          <div className="grid gap-2 pt-4">
            <Label htmlFor="rating" className="text-start">
              Rating
            </Label>
            <div className="flex items-center gap-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  className={`${rating.rating >= star ? "!text-amber-500" : "text-gray-300 hover:text-amber-400"} !border-none !bg-transparent px-0 !outline-none !ring-0`}
                  onClick={() => setRating({ ...rating, rating: star })}
                >
                  <FaStar className="h-5 w-5" />
                </Button>
              ))}

              <span className="text-sm font-medium">
                {rating.rating ? `${rating.rating} of 5 stars` : "No rating"}
              </span>
            </div>
          </div>
          {/* error message */}
          {validationErrors?.rating && (
            <p className="text-sm font-medium text-red-500">
              {validationErrors?.rating}
            </p>
          )}
          {/* feedback */}
          <div className="mt-3 grid gap-4">
            <Label
              htmlFor="feedback"
              className="flex items-center justify-between"
            >
              Review
              {/* letter count */}
              <span className="text-sm text-gray-300">
                {rating.feedback.length}/500
              </span>
            </Label>
            <Textarea
              id="feedback"
              className=""
              value={rating.feedback}
              maxLength={500}
              onChange={(e) =>
                setRating({ ...rating, feedback: e.target.value })
              }
              rows={4}
              placeholder="Enter your feedback..."
            />
          </div>
          {/* error message */}
          {validationErrors?.feedback && (
            <p className="text-sm font-medium text-red-500">
              {validationErrors?.feedback}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={handleSubmit}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
