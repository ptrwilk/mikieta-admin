import { IngredientModel, PizzaType } from "@/types";
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
import { orderBy } from "@/helpers";
import { useOrder } from "@/hooks/useOrder";
import { OrderableTableHead } from "../OrderableTableHead/OrderableTableHead";

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
  const priceSmall = useInput();
  const priceMedium = useInput();
  const priceLarge = useInput();

  const [readonlyItem, setReadeonlyItem] = useState<
    IngredientModel | undefined
  >(undefined);

  const [newItem, setNewItem] = useState<IngredientModel | undefined>(
    undefined
  );
  const [confirmationDialogItem, setConfirmationDialogItem] = useState<
    IngredientModel | undefined
  >(undefined);

  const order = useOrder<IngredientModel>();

  const products = [...(items ?? []), newItem!];

  const readonly = (item: IngredientModel) => readonlyItem?.id !== item.id;

  const onEdit = (item: IngredientModel) => {
    name.setValue(item.name);
    priceSmall.setValue(item.priceSmall.toString());
    priceMedium.setValue(item.priceMedium.toString());
    priceLarge.setValue(item.priceLarge.toString());

    setReadeonlyItem(item);
  };

  const onConfirm = () => {
    onAddOrUpdate?.({
      ...readonlyItem!,
      name: name.value!,
      priceSmall: +priceSmall.value!,
      priceMedium: +priceMedium.value!,
      priceLarge: +priceLarge.value!,
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
      pizzaType: PizzaType.Small,
      priceSmall: 0,
      priceMedium: 0,
      priceLarge: 0,
    } as IngredientModel;
    setNewItem(item);

    onEdit(item);
  };

  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Nr.</TableHead>
            <OrderableTableHead property="name" {...order}>
              Nazwa
            </OrderableTableHead>
            <OrderableTableHead property="priceSmall" {...order}>
              Mała cena
            </OrderableTableHead>
            <OrderableTableHead property="priceMedium" {...order}>
              Średnia cena
            </OrderableTableHead>
            <OrderableTableHead property="priceLarge" {...order}>
              Duża cena
            </OrderableTableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(order
            ? orderBy(products, order.prop as any, order.direction!)
            : products
          )
            .filter((x) => x !== undefined)
            .map((item, key) => (
              <TableRow key={key}>
                <TableCell>
                  <p>{key + 1}</p>
                </TableCell>
                <EditableCell
                  readonly={readonly(item)}
                  read={<p>{item.name}</p>}
                  edit={<TextInput {...name} autoFocus />}
                />
                <EditableCell
                  readonly={readonly(item)}
                  read={<p>{item.priceSmall} zł</p>}
                  edit={<TextInput {...priceSmall} numeric />}
                />
                <EditableCell
                  readonly={readonly(item)}
                  read={<p>{item.priceMedium} zł</p>}
                  edit={<TextInput {...priceMedium} numeric />}
                />
                <EditableCell
                  readonly={readonly(item)}
                  read={<p>{item.priceLarge} zł</p>}
                  edit={<TextInput {...priceLarge} numeric />}
                />
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
        <div className="h-[70px] overflow-hidden">
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

const EditableCell = ({
  readonly,
  read,
  edit,
}: {
  readonly: boolean;
  read: any;
  edit: any;
}) => {
  return <TableCell>{readonly ? read : edit}</TableCell>;
};

export { IngredientsTable };
