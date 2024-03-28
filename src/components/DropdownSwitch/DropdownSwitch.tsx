import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export type DropdownItem = {
  text: string;
  className?: string;
};

interface IDropdownSwitchProps {
  items?: DropdownItem[];
  selectedItem?: DropdownItem;
  excludedItems?: DropdownItem[];
  onSelectionClick?: (item: DropdownItem) => void;
}

const DropdownSwitch: React.FC<IDropdownSwitchProps> = ({
  items = [],
  selectedItem,
  excludedItems = [],
  onSelectionClick,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={selectedItem?.className}>
          {selectedItem?.text}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items
          .filter((x) => x.text !== selectedItem?.text)
          .filter((x) =>
            excludedItems.length === 0
              ? x
              : excludedItems?.some((y) => y.text === x.text)
          )
          .map((item, key) => (
            <DropdownMenuItem
              key={key}
              onClick={() => onSelectionClick?.(item)}
            >
              {item.text}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { DropdownSwitch };
