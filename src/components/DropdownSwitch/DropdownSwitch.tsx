import styles from "./DropdownSwitch.module.css";

import classNames from "classnames";
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
  caption?: string;
  border?: boolean;
  widthFull?: boolean;
  readonly?: boolean;
  onSelectionClick?: (item: DropdownOption) => void;
  equalityComparison?: (option: DropdownOption, selectedValue: any) => boolean;
}

const DropdownSwitch: React.FC<IDropdownSwitchProps> = ({
  className,
  options = [],
  selectedValue,
  excludedValues = [],
  caption,
  border,
  widthFull,
  readonly,
  onSelectionClick,
  equalityComparison,
}) => {
  const label = options.find(
    (x) => equalityComparison?.(x, selectedValue) ?? x.value === selectedValue
  )?.label;

  return (
    <div
      className={classNames(styles["DropdownSwitch"], {
        [styles["DropdownSwitch-WidthFull"]]: widthFull,
      })}
    >
      {caption && <p className={classNames(styles["Caption"])}>{caption}</p>}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={border ? "outline" : "ghost"}
            className={className}
            disabled={readonly}
          >
            {label}
          </Button>
        </DropdownMenuTrigger>
        {!readonly && (
          <DropdownMenuContent>
            <div className="max-h-[40vh] overflow-auto">
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
            </div>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
};

export { DropdownSwitch };
