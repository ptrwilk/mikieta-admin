import { useInput } from "@/hooks";
import { TextInput } from "../TextInput";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { AddressModel } from "@/types";

interface IAddressDialog {
  defaultValue?: AddressModel;
  open?: boolean;
  onClose?: () => void;
  onConfirm?: (model: AddressModel) => void;
}

const AddressDialog: React.FC<IAddressDialog> = ({
  defaultValue,
  open,
  onClose,
  onConfirm,
}) => {
  const street = useInput([], defaultValue?.street);
  const city = useInput([], defaultValue?.city);
  const homeNumber = useInput([], defaultValue?.homeNumber);
  const flatNumber = useInput([], defaultValue?.flatNumber);
  const floor = useInput([], defaultValue?.floor);

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adres</DialogTitle>
        </DialogHeader>
        <ul className="flex flex-col gap-4 mt-4">
          <li>
            <TextInput captionTop caption="Miasto" {...city} />
          </li>
          <li>
            <TextInput captionTop caption="Ulica" {...street} />
          </li>
          <li>
            <TextInput captionTop caption="Numer domu" {...homeNumber} />
          </li>
          <li>
            <TextInput captionTop caption="Numer mieszkania" {...flatNumber} />
          </li>
          <li>
            <TextInput captionTop caption="Piętro" {...floor} />
          </li>
        </ul>
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={onClose}>
            Anuluj
          </Button>
          <Button
            variant="default"
            onClick={() => {
              onConfirm?.({
                city: city.value,
                homeNumber: homeNumber.value,
                street: street.value,
                flatNumber: flatNumber.value,
                floor: floor.value,
              });
            }}
          >
            Zatwierdź
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { AddressDialog };
