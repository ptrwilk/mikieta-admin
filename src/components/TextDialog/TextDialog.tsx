import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface ITextDialogProps {
  open?: boolean;
  title?: string;
  text?: string;
  onClose?: () => void;
}

const TextDialog: React.FC<ITextDialogProps> = ({
  open,
  title,
  text,
  onClose,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p>{text}</p>
      </DialogContent>
    </Dialog>
  );
};

export { TextDialog };
