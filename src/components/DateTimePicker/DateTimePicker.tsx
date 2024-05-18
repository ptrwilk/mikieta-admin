import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { TimePickerDemo } from "../ui/time-picker-demo";
import styles from "./DateTimePicker.module.css";
import classNames from "classnames";
import { useEffect, useState } from "react";

interface IDateTimePickerProsp {
  caption?: string;
  date?: Date;
  error?: boolean;
  errorMessage?: string;
  readonly?: boolean;
  onDateChange?: (date?: Date) => void;
}

const DateTimePicker: React.FC<IDateTimePickerProsp> = ({
  caption,
  date,
  error,
  errorMessage,
  readonly,
  onDateChange,
}) => {
  const [open, setOpen] = useState(false);
  const [dateState, setDateState] = useState<Date | undefined>(date);

  useEffect(() => {
    setDateState(date);
  }, [date]);

  const formatDate = (date: Date) =>
    date.getDate() === new Date().getDate()
      ? format(date, "HH:mm:ss")
      : format(date, "PPP HH:mm:ss");

  const handleDateChange = (date?: Date) => {
    setDateState(date);
  };

  const handleConfirm = () => {
    onDateChange?.(dateState);
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen === false) {
      setOpen(isOpen);
      setDateState(date);
    }
  };

  return (
    <>
      {readonly ? (
        <p>{formatDate(dateState!)}</p>
      ) : (
        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild className={styles["DateTimePicker"]}>
            <div
              className="flex flex-col items-start"
              onClick={() => setOpen(true)}
            >
              {caption && (
                <p
                  className={classNames(styles["Caption"], {
                    [styles["Caption-Error"]]: error,
                  })}
                >
                  {caption}
                </p>
              )}
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateState && "text-muted-foreground"
                )}
              >
                {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                {dateState ? formatDate(dateState!) : <span>Pick a date</span>}
              </Button>

              {errorMessage && error && (
                <p className={styles["ErrorMessage"]}>{errorMessage}</p>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateState}
              onSelect={(e) =>
                handleDateChange(
                  new Date(
                    e!.getFullYear(),
                    e!.getMonth(),
                    e!.getDate(),
                    dateState!.getHours(),
                    dateState!.getMinutes(),
                    dateState!.getSeconds()
                  )
                )
              }
              initialFocus
            />
            <div className="flex justify-between p-3 border-t border-border">
              <TimePickerDemo setDate={handleDateChange} date={dateState} />
              <Button className="self-end" onClick={handleConfirm}>
                OK
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export { DateTimePicker };
