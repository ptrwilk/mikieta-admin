import {
  IngredientModel,
  PizzaSizePrice,
  PizzaType,
  ProductModel,
  ProductType,
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
import { isNill, orderBy } from "@/helpers";
import { OrderableTableHead } from "../OrderableTableHead/OrderableTableHead";
import { useOrder } from "@/hooks/useOrder";

interface IProductsTableProps {
  className?: string;
  items?: ProductModel[];
  ingredients?: IngredientModel[];
  onAddOrUpdate?: (item: ProductModel, image?: any) => void;
  onDelete?: (item: ProductModel) => void;
}

const ProductsTable: React.FC<IProductsTableProps> = ({
  className,
  items,
  ingredients,
  onAddOrUpdate,
  onDelete,
}) => {
  const [readonlyItem, setReadeonlyItem] = useState<ProductModel | undefined>(
    undefined
  );

  const name = useInput();
  const description = useInput();
  const price = useInput();
  const [type, setType] = useState<ProductType | undefined>(undefined);
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientModel[]
  >([]);
  const [selectedImage, setSelectedImage] = useState<any>(undefined);
  const [imagePopoverOpen, setImagePopoverOpen] = useState(false);

  const [newItem, setNewItem] = useState<ProductModel | undefined>(undefined);
  const [confirmationDialogItem, setConfirmationDialogItem] = useState<
    ProductModel | undefined
  >(undefined);
  const [pizzaSizePrice, setPizzaSizePrice] = useState<
    PizzaSizePrice | undefined
  >(undefined);

  const order = useOrder<ProductModel>();

  const products = [...(items ?? []), newItem!];

  const options = [
    {
      label: "Pizza",
      value: ProductType.Pizza,
    },
    {
      label: "Sosy do pizzy",
      value: ProductType.Sauce,
    },
    {
      label: "Napoje",
      value: ProductType.Drink,
    },
    {
      label: "Przekąski",
      value: ProductType.Snack,
    },
  ];

  const readonly = (item: ProductModel) => readonlyItem?.id !== item.id;

  const onEdit = (item: ProductModel) => {
    name.setValue(item.name);
    description.setValue(item.description);
    price.setValue(item.price.toString());
    setType(item.productType);
    setSelectedIngredients(item.ingredients);
    setPizzaSizePrice(item.pizzaSizePrice);

    setReadeonlyItem(item);
  };

  const onConfirm = () => {
    onAddOrUpdate?.(
      {
        ...readonlyItem!,
        name: name.value!,
        description: description.value,
        price: parseFloat(price.value!),
        productType: type!,
        ingredients: selectedIngredients,
        pizzaSizePrice: pizzaSizePrice!,
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
      productType: ProductType.Pizza,
      pizzaType: PizzaType.Small,
      ingredients: [],
      pizzaSizePrice: {
        Large: 0,
        Medium: 0,
        Small: 0,
      },
    } as ProductModel;
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
            <OrderableTableHead property="description" {...order}>
              Opis
            </OrderableTableHead>
            <OrderableTableHead
              className="min-w-[100px]"
              property="price"
              {...order}
            >
              Cena
            </OrderableTableHead>
            <OrderableTableHead property="pizzaType" {...order}>
              Typ
            </OrderableTableHead>
            <OrderableTableHead property="imageUrl" {...order}>
              Zdjęcie
            </OrderableTableHead>
            <OrderableTableHead property="ingredients" {...order}>
              Składniki
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
                    <>
                      {item.productType === ProductType.Pizza ? (
                        <ReadOnlyPrices item={item} />
                      ) : (
                        <p>{item.price} zł</p>
                      )}
                    </>
                  ) : (
                    <>
                      {type === ProductType.Pizza ? (
                        <EditPrices
                          item={pizzaSizePrice!}
                          onPizzaSizePriceChange={(item) =>
                            setPizzaSizePrice(item)
                          }
                        />
                      ) : (
                        <TextInput {...price} numeric />
                      )}
                    </>
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
                      onSelectionClick={(item) => {
                        const type = item.value as ProductType;

                        if (type === ProductType.Pizza) {
                          setPizzaSizePrice({
                            Large: 0,
                            Medium: 0,
                            Small: 0,
                          });
                        }
                        setType(item.value);
                      }}
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

const ReadOnlyPrices = ({ item }: { item: ProductModel }) => {
  return (
    <ul className="flex flex-col gap-1">
      {Object.keys(PizzaType).map((type, key) => (
        <li key={key}>
          <p>{item.pizzaSizePrice[type as PizzaType].toFixed(2)} zł</p>
        </li>
      ))}
    </ul>
  );
};

const EditPrices = ({
  item,
  onPizzaSizePriceChange,
}: {
  item: PizzaSizePrice;
  onPizzaSizePriceChange: (item: PizzaSizePrice) => void;
}) => {
  const update = (value: string | undefined, type: PizzaType) => {
    onPizzaSizePriceChange({
      ...item,
      [type]: parseFloat(isNill(value) ? "0" : value!),
    });
  };

  const small = useInput([], item[PizzaType.Small].toString(), (value) =>
    update(value, PizzaType.Small)
  );
  const medium = useInput([], item[PizzaType.Medium].toString(), (value) =>
    update(value, PizzaType.Medium)
  );
  const large = useInput([], item[PizzaType.Large].toString(), (value) =>
    update(value, PizzaType.Large)
  );

  return (
    <ul className="flex flex-col gap-2 w-[150px]">
      <li>
        <TextInput caption={"Mała"} numeric {...small} />
      </li>
      <li>
        <TextInput caption={"Średnia"} numeric {...medium} />
      </li>
      <li>
        <TextInput caption={"Duża"} numeric {...large} />
      </li>
    </ul>
  );
};

export { ProductsTable };
