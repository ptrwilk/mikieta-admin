import { FaImage } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { isNill } from "@/helpers";
import { IMG_WIDTH } from "@/consts";

interface IImagePopoverProps {
  src?: any;
}

const ImagePopover: React.FC<IImagePopoverProps> = ({ src }) => {
  return (
    <>
      {!isNill(src) && (
        <Popover>
          <PopoverTrigger>
            <FaImage className="cursor-pointer" size={20} />
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <img
              className={`w-[${IMG_WIDTH}px] h-[${IMG_WIDTH}px] object-fill`}
              src={src}
            />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export { ImagePopover };
