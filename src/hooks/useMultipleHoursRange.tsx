import { useState } from "react";

export type MultipleHoursRangeOptions = {
  title: string;
  from: string;
  to: string;
};

export const useMultipleHoursRange = (
  options: MultipleHoursRangeOptions[] = []
) => {
  const [hours, setHours] = useState(options);

  const handleToChange = (index: number, value: string) => {
    const newHours = hours.map((hour, i) => {
      if (i === index) {
        return { ...hour, to: value };
      }
      return hour;
    });

    setHours(newHours);
  };

  const handleFromChange = (index: number, value: string) => {
    const newHours = hours.map((hour, i) => {
      if (i === index) {
        return { ...hour, from: value };
      }
      return hour;
    });

    setHours(newHours);
  };

  const setValues = (options: MultipleHoursRangeOptions[]) => {
    setHours(options);
  };

  return {
    hours,
    onToChange: handleToChange,
    onFromChange: handleFromChange,
    setValues,
  };
};
