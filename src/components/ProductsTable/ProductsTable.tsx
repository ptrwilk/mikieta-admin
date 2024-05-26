import { IngredientModel, ProductModel3, ProductType2 } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TextInput } from "../TextInput";
import { useInput } from "@/hooks";
import { SlOptions } from "react-icons/sl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DropdownSwitch } from "../DropdownSwitch/DropdownSwitch";
import { useState } from "react";
import { Multiselect } from "../Multiselect/Multiselect";

interface IProductsTableProps {
  className?: string;
  items?: ProductModel3[];
  ingredients?: IngredientModel[];
  onUpdate?: (item: ProductModel3) => void;
}

const ProductsTable: React.FC<IProductsTableProps> = ({
  className,
  items,
  ingredients,
  onUpdate,
}) => {
  const [readonlyItem, setReadeonlyItem] = useState<ProductModel3 | undefined>(
    undefined
  );

  const name = useInput();
  const description = useInput();
  const price = useInput();
  const [type, setType] = useState<ProductType2 | undefined>(undefined);
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientModel[]
  >([]);

  const options = [
    {
      label: "Pizza 32 CM.",
      value: ProductType2.PizzaSmall,
    },
    {
      label: "Pizza 40 CM.",
      value: ProductType2.PizzaMedium,
    },
    { label: "Pizza 50 CM.", value: ProductType2.PizzaBig },
    { label: "Sosy do pizzy", value: ProductType2.Sauce },
    { label: "Napoje", value: ProductType2.Drink },
    { label: "Przekąski", value: ProductType2.Snack },
  ];

  const readonly = (item: ProductModel3) => readonlyItem?.id !== item.id;

  const onEdit = (item: ProductModel3) => {
    name.setValue(item.name);
    description.setValue(item.description);
    price.setValue(item.price.toString());
    setType(item.productType);
    setSelectedIngredients(item.ingredients);

    setReadeonlyItem(item);
  };

  const onConfirm = () => {
    onUpdate?.({
      ...readonlyItem!,
      name: name.value!,
      description: description.value,
      price: parseFloat(price.value!),
      productType: type!,
      ingredients: selectedIngredients,
    });
    setReadeonlyItem(undefined);
  };

  return (
    <Table className={className}>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Nr.</TableHead>
          <TableHead>Nazwa</TableHead>
          <TableHead>Opis</TableHead>
          <TableHead>Cena</TableHead>
          <TableHead>Typ</TableHead>
          <TableHead>Składniki</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map((item, key) => (
          <TableRow key={key}>
            <TableCell>
              <p>{key + 1}</p>
            </TableCell>
            <TableCell>
              {readonly(item) ? <p>{item.name}</p> : <TextInput {...name} />}
            </TableCell>
            <TableCell>
              {readonly(item) ? (
                <p>{item.description}</p>
              ) : (
                <TextInput {...description} />
              )}
            </TableCell>
            <TableCell>
              {readonly(item) ? (
                <p>{item.price}</p>
              ) : (
                <TextInput {...price} numeric />
              )}
            </TableCell>
            <TableCell>
              {readonly(item) ? (
                <p>
                  {options.find((x) => x.value === item.productType)?.label}
                </p>
              ) : (
                <DropdownSwitch
                  className="font-normal"
                  options={options}
                  selectedValue={type}
                  onSelectionClick={(item) => setType(item.value)}
                />
              )}
            </TableCell>
            <TableCell>
              {readonly(item) ? (
                <p>{item.ingredients.map((x) => x.name).join(", ")}</p>
              ) : (
                <Multiselect
                  selected={selectedIngredients.map((x) => x.id)}
                  onSelect={(value) => {
                    if (selectedIngredients.map((x) => x.id).includes(value)) {
                      setSelectedIngredients(
                        selectedIngredients.filter((x) => x.id !== value)
                      );
                    } else {
                      setSelectedIngredients([
                        ...selectedIngredients,
                        ingredients!.find((x) => x.id === value)!,
                      ]);
                    }
                  }}
                  options={ingredients?.map((x) => ({
                    label: x.name,
                    value: x.id,
                  }))}
                />
              )}
            </TableCell>
            <TableCell className="text-right">
              {!readonly(item) ? (
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setReadeonlyItem(undefined)}
                  >
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
                    <DropdownMenuItem>Usuń</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export { ProductsTable };
