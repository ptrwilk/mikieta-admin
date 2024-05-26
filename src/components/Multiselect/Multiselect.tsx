import { FaSearch } from "react-icons/fa";
import { TextInput } from "../TextInput";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { useInput } from "@/hooks";

interface IMultiselectProps {
  options?: { label: string; value: string }[];
  selected?: string[];
  onSelect?: (value: string) => void;
}

const Multiselect: React.FC<IMultiselectProps> = ({
  options = [],
  selected = [],
  onSelect,
}) => {
  const search = useInput([], undefined);

  return (
    <Popover>
      <PopoverTrigger asChild>
        {selected.length > 0 ? (
          <ul className="flex flex-wrap gap-1 cursor-pointer">
            {selected?.map((value, key) => (
              <li key={key} className="p-1 rounded-sm bg-slate-200">
                <p>{options.find((x) => x.value === value)?.label}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="cursor-pointer">wybierz</p>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div>
          <div className="flex items-end">
            <FaSearch className="mb-3" />
            <TextInput
              captionTop
              border={false}
              placeholder="Szukaj"
              {...search}
            />
          </div>
          <Separator />
          <ul>
            {options
              .filter(
                (x) =>
                  search.value === undefined ||
                  x.label.toLowerCase().includes(search.value.toLowerCase())
              )
              .map((option, key) => (
                <li
                  key={key}
                  className="cursor-pointer"
                  onClick={() => onSelect?.(option.value)}
                >
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={selected?.some((x) => x === option.value)}
                    />
                    <p className="mb-1">{option.label}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { Multiselect };
