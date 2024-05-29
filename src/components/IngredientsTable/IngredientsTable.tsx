import { IngredientModel } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TextInput } from "../TextInput";
import { useInput } from "@/hooks";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SlOptions } from "react-icons/sl";
import { Separator } from "../ui/separator";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";

interface IIngredientsTableProps {
  className?: string;
  items?: IngredientModel[];
  onAddOrUpdate?: (item: IngredientModel) => void;
  onDelete?: (item: IngredientModel) => void;
}

const IngredientsTable: React.FC<IIngredientsTableProps> = ({
  className,
  items,
  onAddOrUpdate,
  onDelete,
}) => {
  const name = useInput();

  const [readonlyItem, setReadeonlyItem] = useState<
    IngredientModel | undefined
  >(undefined);

  const [newItem, setNewItem] = useState<IngredientModel | undefined>(
    undefined
  );
  const [confirmationDialogItem, setConfirmationDialogItem] = useState<
    IngredientModel | undefined
  >(undefined);

  const readonly = (item: IngredientModel) => readonlyItem?.id !== item.id;

  const onEdit = (item: IngredientModel) => {
    name.setValue(item.name);

    setReadeonlyItem(item);
  };

  const onConfirm = () => {
    onAddOrUpdate?.({
      ...readonlyItem!,
      name: name.value!,
    });
    onCancel();
  };

  const onCancel = () => {
    setReadeonlyItem(undefined);
    setNewItem(undefined);
  };

  const onAddNewItemClick = () => {
    const item = {
      name: "",
    };
    setNewItem(item);

    onEdit(item);
  };

  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Nr.</TableHead>
            <TableHead>Nazwa</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...(items ?? []), newItem!]
            .filter((x) => x !== undefined)
            .map((item, key) => (
              <TableRow key={key}>
                <TableCell>
                  <p>{key + 1}</p>
                </TableCell>
                <TableCell>
                  {readonly(item) ? (
                    <p>{item.name}</p>
                  ) : (
                    <TextInput {...name} autoFocus />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {!readonly(item) ? (
                    <div className="flex justify-end gap-4">
                      <Button variant="outline" onClick={onCancel}>
                        Anuluj
                      </Button>
                      <Button onClick={onConfirm}>Zatwierdź</Button>
                    </div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        disabled={readonlyItem !== undefined}
                      >
                        <Button
                          variant="ghost"
                          disabled={readonlyItem !== undefined}
                        >
                          <SlOptions />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onEdit(item)}>
                          Edytuj
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setConfirmationDialogItem(item)}
                        >
                          Usuń
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {newItem === undefined && (
        <div className="h-[70px]">
          <Separator />
          <div className="flex justify-center items-center italic hover:bg-gray-50 h-full">
            <p className="cursor-pointer" onClick={onAddNewItemClick}>
              Dodaj nowy wpis
            </p>
          </div>
        </div>
      )}
      {confirmationDialogItem !== undefined && (
        <ConfirmationDialog
          title="Usuwanie składnika"
          description="Czy na pewno chcesz usunąć składnik?"
          open
          onClose={() => setConfirmationDialogItem(undefined)}
          onConfirm={() => {
            onDelete?.(confirmationDialogItem);
            setConfirmationDialogItem(undefined);
          }}
        />
      )}
    </div>
  );
};

export { IngredientsTable };
