import { DropdownSwitch } from "../DropdownSwitch/DropdownSwitch";

interface IHoursRangeProps {
  title?: string;
  options?: { label: string; value: string }[];
  from?: string;
  to?: string;
  readonly?: boolean;
  toChange?: (value: string) => void;
  fromChange?: (value: string) => void;
}

const HoursRange: React.FC<IHoursRangeProps> = ({
  title,
  options,
  from,
  to,
  readonly,
  toChange,
  fromChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm">{title}</p>
      <div className="flex gap-4">
        <DropdownSwitch
          className="w-full font-normal"
          readonly={readonly}
          border
          widthFull
          selectedValue={from}
          options={options}
          onSelectionClick={({ value }) => fromChange?.(value)}
        />
        <p className="self-center">do</p>
        <DropdownSwitch
          className="w-full font-normal"
          readonly={readonly}
          border
          widthFull
          selectedValue={to}
          options={options}
          onSelectionClick={({ value }) => toChange?.(value)}
        />
      </div>
    </div>
  );
};

export { HoursRange };
