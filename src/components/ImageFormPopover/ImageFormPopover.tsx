import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { isNill } from "@/helpers";
import { IMG_WIDTH } from "@/consts";

interface IImageFormPopoverProps {
  open?: boolean;
  defaultImageUrl?: string;
  onOpen?: () => void;
  onClose?: (selectedImage: any) => void;
  onDelete?: () => void;
}

const ImageFormPopover: React.FC<IImageFormPopoverProps> = ({
  open,
  defaultImageUrl,
  onOpen,
  onClose,
  onDelete,
}) => {
  const [selectedImage, setSelectedImage] = useState<any>(defaultImageUrl);

  const handleOpen = (open: boolean) => {
    if (open) {
      onOpen?.();
    } else {
      onClose?.(selectedImage);
    }
  };

  const handleDelete = () => {
    setSelectedImage(undefined);
    onDelete?.();
  };

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger>
        <p>{isNill(selectedImage) ? "dodaj" : "zmień"}</p>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        {isNill(selectedImage) ? (
          <AddContent onAdd={(result) => setSelectedImage(result)} />
        ) : (
          <EditContent
            src={selectedImage}
            onChange={(result) => setSelectedImage(result)}
            onDelete={handleDelete}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

const ImageButton = ({
  name,
  onImageChange,
}: {
  name: string;
  onImageChange: (image: any) => void;
}) => {
  const fileInputRef = useRef<any>(undefined);

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        const aspectRatio = img.width / img.height;
        let newWidth = 500;
        let newHeight = Math.round(newWidth / aspectRatio);

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          (blob) => {
            onImageChange(blob);
          },
          "image/jpeg",
          0.8
        );
      };

      img.src = reader.result as any;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        onChange={handleImageUpload}
        type="file"
        accept="image/*"
        style={{ position: "absolute", display: "none" }}
      />
      <Button onClick={handleAdd}>{name}</Button>
    </>
  );
};

interface IAddContentProps {
  onAdd: (image: any) => void;
}

const AddContent: React.FC<IAddContentProps> = ({ onAdd }) => {
  return (
    <div className="flex items-center justify-between gap-12">
      <p>Dodaj zdjęcie...</p>
      <div className="flex gap-2">
        <ImageButton name="Wybierz" onImageChange={onAdd} />
      </div>
    </div>
  );
};

interface IEditContentProps {
  src: any;
  onChange: (image: any) => void;
  onDelete?: () => void;
}

const EditContent: React.FC<IEditContentProps> = ({
  src,
  onChange,
  onDelete,
}) => {
  var isBlob = src instanceof Blob;
  return (
    <div className="flex flex-col gap-6">
      <img
        className={`w-[${IMG_WIDTH}px] h-[${IMG_WIDTH}px] object-fill self-center`}
        src={isBlob ? URL.createObjectURL(src) : src}
      />
      <div className="flex gap-4">
        <Button variant="destructive" onClick={onDelete}>
          Usuń
        </Button>
        <div className="flex gap-2">
          <ImageButton name="Zmień" onImageChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export { ImageFormPopover };
