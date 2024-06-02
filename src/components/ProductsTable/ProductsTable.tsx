import {
  IngredientModel,
  PizzaType,
  ProductModel3,
  ProductType2,
} from "@/types";
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
import { SlOptions } from "react-icons/sl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  DropdownOption,
  DropdownSwitch,
} from "../DropdownSwitch/DropdownSwitch";
import { useState } from "react";
import { Multiselect } from "../Multiselect/Multiselect";
import { Separator } from "../ui/separator";
import { ImagePopover } from "../ImagePopover/ImagePopover";
import { ImageFormPopover } from "../ImageFormPopover/ImageFormPopover";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";

interface IProductsTableProps {
  className?: string;
  items?: ProductModel3[];
  ingredients?: IngredientModel[];
  onAddOrUpdate?: (item: ProductModel3, image?: any) => void;
  onDelete?: (item: ProductModel3) => void;
}

type ProductPizzaType = {
  productType: ProductType2;
  pizzaType: PizzaType | null;
};

const ProductsTable: React.FC<IProductsTableProps> = ({
  className,
  items,
  ingredients,
  onAddOrUpdate,
  onDelete,
}) => {
  const [readonlyItem, setReadeonlyItem] = useState<ProductModel3 | undefined>(
    undefined
  );

  const name = useInput();
  const description = useInput();
  const price = useInput();
  const [type, setType] = useState<ProductPizzaType | undefined>(undefined);
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientModel[]
  >([]);
  const [selectedImage, setSelectedImage] = useState<any>(undefined);
  const [imagePopoverOpen, setImagePopoverOpen] = useState(false);

  const [newItem, setNewItem] = useState<ProductModel3 | undefined>(undefined);
  const [confirmationDialogItem, setConfirmationDialogItem] = useState<
    ProductModel3 | undefined
  >(undefined);

  const options = [
    {
      label: "Pizza 32 CM.",
      value: {
        productType: ProductType2.Pizza,
        pizzaType: PizzaType.Small,
      } as ProductPizzaType,
    },
    {
      label: "Pizza 40 CM.",
      value: {
        productType: ProductType2.Pizza,
        pizzaType: PizzaType.Medium,
      } as ProductPizzaType,
    },
    {
      label: "Pizza 50 CM.",
      value: {
        productType: ProductType2.Pizza,
        pizzaType: PizzaType.Large,
      } as ProductPizzaType,
    },
    {
      label: "Sosy do pizzy",
      value: {
        productType: ProductType2.Sauce,
        pizzaType: null,
      } as ProductPizzaType,
    },
    {
      label: "Napoje",
      value: {
        productType: ProductType2.Drink,
        pizzaType: null,
      } as ProductPizzaType,
    },
    {
      label: "Przekąski",
      value: {
        productType: ProductType2.Snack,
        pizzaType: null,
      } as ProductPizzaType,
    },
  ];

  const readonly = (item: ProductModel3) => readonlyItem?.id !== item.id;

  const onEdit = (item: ProductModel3) => {
    name.setValue(item.name);
    description.setValue(item.description);
    price.setValue(item.price.toString());
    setType({ productType: item.productType, pizzaType: item.pizzaType });
    setSelectedIngredients(item.ingredients);

    setReadeonlyItem(item);
  };

  const onConfirm = () => {
    onAddOrUpdate?.(
      {
        ...readonlyItem!,
        name: name.value!,
        description: description.value,
        price: parseFloat(price.value!),
        productType: type?.productType!,
        pizzaType: type?.pizzaType ?? null,
        ingredients: selectedIngredients,
      },
      selectedImage
    );
    onCancel();
  };

  const onCancel = () => {
    setReadeonlyItem(undefined);
    setNewItem(undefined);
    setSelectedImage(undefined);
  };

  const onAddNewItemClick = () => {
    const item = {
      name: "",
      description: "",
      price: 0,
      productType: ProductType2.Pizza,
      pizzaType: PizzaType.Small,
      ingredients: [],
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
            <TableHead>Opis</TableHead>
            <TableHead className="min-w-[100px]">Cena</TableHead>
            <TableHead>Typ</TableHead>
            <TableHead>Zdjęcie</TableHead>
            <TableHead>Składniki</TableHead>
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
                <TableCell>
                  {readonly(item) ? (
                    <p>{item.description}</p>
                  ) : (
                    <TextInput {...description} />
                  )}
                </TableCell>
                <TableCell>
                  {readonly(item) ? (
                    <p>{item.price} zł</p>
                  ) : (
                    <TextInput {...price} numeric />
                  )}
                </TableCell>
                <TableCell>
                  {readonly(item) ? (
                    <p>
                      {
                        options.find(
                          (x) =>
                            x.value.productType === item.productType &&
                            x.value.pizzaType === item.pizzaType
                        )?.label
                      }
                    </p>
                  ) : (
                    <DropdownSwitch
                      className="font-normal"
                      options={options}
                      selectedValue={type}
                      onSelectionClick={(item) => setType(item.value)}
                      equalityComparison={(
                        { value }: DropdownOption,
                        selectedValue?: ProductPizzaType
                      ) =>
                        value.productType === selectedValue?.productType &&
                        value.pizzaType === selectedValue?.pizzaType
                      }
                    />
                  )}
                </TableCell>
                <TableCell>
                  {readonly(item) ? (
                    <ImagePopover src={item.imageUrl} />
                  ) : (
                    <ImageFormPopover
                      open={imagePopoverOpen}
                      defaultImageUrl={item.imageUrl}
                      onOpen={() => setImagePopoverOpen(true)}
                      onClose={(selectedImage: any) => {
                        setImagePopoverOpen(false);
                        setSelectedImage(selectedImage);
                      }}
                      onDelete={() => {
                        setImagePopoverOpen(false);
                        setSelectedImage(undefined);
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {readonly(item) ? (
                    <p>{item.ingredients.map((x) => x.name).join(", ")}</p>
                  ) : (
                    <Multiselect
                      selected={selectedIngredients.map((x) => x.id!)}
                      onSelect={(value) => {
                        if (
                          selectedIngredients.map((x) => x.id).includes(value)
                        ) {
                          setSelectedIngredients(
                            selectedIngredients.filter((x) => x.id !== value)
                          );
                        } else {
                          setSelectedIngredients([
                            ...selectedIngredients,
                            ingredients?.find((x) => x.id === value)!,
                          ]);
                        }
                      }}
                      options={ingredients?.map((x) => ({
                        label: x.name,
                        value: x.id!,
                      }))}
                    />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {!readonly(item) ? (
                    <div className="flex gap-4">
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
          title="Usuwanie produktu"
          description="Czy na pewno chcesz usunąć produkt?"
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

export { ProductsTable };
