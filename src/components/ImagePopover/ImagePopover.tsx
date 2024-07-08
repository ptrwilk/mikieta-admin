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
              className={"object-fill"}
              style={{ width: `${IMG_WIDTH}px`, height: `${IMG_WIDTH}px` }}
              src={src}
            />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export { ImagePopover };
