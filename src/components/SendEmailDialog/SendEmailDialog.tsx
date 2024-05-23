import { useState } from "react";
import { TextArea } from "../TextArea/TextArea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface ISendEmailDialogProps {
  open?: boolean;
  buttonDisabled?: boolean;
  onSend?: (text?: string) => void;
  onClose?: () => void;
}

const SendEmailDialog: React.FC<ISendEmailDialogProps> = ({
  open,
  buttonDisabled,
  onSend,
  onClose,
}) => {
  const [text, setText] = useState<string | undefined>(
    "Rezerwacja została potwierdzona."
  );

  const handleSend = () => {
    onSend?.(text);
  };

  return (
    <Dialog open={open}>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <DialogTitle>Wiadomość</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <TextArea value={text} onValueChange={(value) => setText(value)} />
          <Button
            className="self-end"
            onClick={handleSend}
            disabled={buttonDisabled}
          >
            Wyślij
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { SendEmailDialog };
