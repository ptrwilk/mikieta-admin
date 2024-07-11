import classNames from "classnames";
import { DropdownSwitch } from "../DropdownSwitch/DropdownSwitch";
import { Button } from "../ui/button";
import {
  HiChevronDoubleLeft,
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleRight,
} from "react-icons/hi";

export type PagingOption = { label: string; value: number };

export interface IPagingProps {
  className?: string;
  selectedRow?: number;
  selectedPage?: number;
  maxPages?: number;
  maxRows?: number;
  onPageChange?: (page: number) => void;
  onRowsChange?: (option: PagingOption) => void;
}

const Paging: React.FC<IPagingProps> = ({
  className,
  selectedRow = 0,
  selectedPage = 0,
  maxPages = 0,
  maxRows = 0,
  onPageChange,
  onRowsChange,
}) => {
  const disabledLeft = selectedPage === 1 || selectedPage === 0;
  const disabledRight = selectedPage === maxPages;

  const rows = generatePagingArray(maxRows);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > maxPages) return;

    onPageChange?.(page);
  };

  return (
    <div className={classNames(className, "flex items-center")}>
      <div className="flex items-center gap-2">
        <p className="font-medium text-sm">Liczba wierszy</p>
        <DropdownSwitch
          className="w-[30px] h-[30px]"
          border
          selectedValue={selectedRow}
          options={rows}
          onSelectionClick={(value) => onRowsChange?.(value)}
        />
      </div>
      <div className="flex items-center">
        <p className="font-medium text-sm mx-12">
          Strona {selectedPage || 1} z {maxPages || 1}
        </p>
        <ul className="flex gap-2">
          <li>
            <IconButton
              disabled={disabledLeft}
              onClick={() => handlePageChange(1)}
            >
              <HiChevronDoubleLeft size={16} />
            </IconButton>
          </li>
          <li>
            <IconButton
              disabled={disabledLeft}
              onClick={() => handlePageChange(selectedPage - 1)}
            >
              <HiChevronLeft size={16} />
            </IconButton>
          </li>
          <li>
            <IconButton
              disabled={disabledRight}
              onClick={() => handlePageChange(selectedPage + 1)}
            >
              <HiChevronRight size={16} />
            </IconButton>
          </li>
          <li>
            <IconButton
              disabled={disabledRight}
              onClick={() => handlePageChange(maxPages)}
            >
              <HiChevronDoubleRight size={16} />
            </IconButton>
          </li>
        </ul>
      </div>
    </div>
  );
};

const IconButton = ({
  children,
  disabled,
  onClick,
}: {
  children: any;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Button
      className={classNames("h-[30px] w-[30px] p-0", {
        "opacity-50": disabled,
      })}
      variant="outline"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

const generatePagingArray = (
  rows: number
): { label: string; value: number }[] => {
  const result: any[] = [];

  if (rows <= 10) {
    return [{ label: "10", value: 0 }];
  } else {
    let max = rows >= 50 ? 5 : Math.ceil(rows / 10);

    for (let i = 0; i < max; i++) {
      result.push({ label: ((i + 1) * 10).toString(), value: i });
    }
  }

  return result;
};

export { Paging };
