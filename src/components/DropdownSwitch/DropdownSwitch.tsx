import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export type DropdownOption = {
  value: any;
  label: string;
};

interface IDropdownSwitchProps {
  className?: string;
  options?: DropdownOption[];
  selectedValue?: any;
  excludedValues?: any[];
  onSelectionClick?: (item: DropdownOption) => void;
}

const DropdownSwitch: React.FC<IDropdownSwitchProps> = ({
  className,
  options = [],
  selectedValue,
  excludedValues = [],
  onSelectionClick,
}) => {
  const label = options.find((x) => x.value === selectedValue)?.label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={className}>
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options
          .filter((x) => x.label !== label)
          .filter((x) =>
            excludedValues.length === 0
              ? x
              : excludedValues?.some((y) => y !== x.value)
          )
          .map((option, key) => (
            <DropdownMenuItem
              key={key}
              onClick={() => onSelectionClick?.(option)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { DropdownSwitch };
