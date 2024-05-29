import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface IConfirmationDialogProps {
  title?: string;
  description?: string;
  open?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

const ConfirmationDialog: React.FC<IConfirmationDialogProps> = ({
  title,
  description,
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Anuluj
          </Button>
          <Button onClick={onConfirm}>Potwierdź</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { ConfirmationDialog };
