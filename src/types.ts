export type Guid = string;

export type SettingModel = {
  street?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
  facebook?: string;
  deliveryPrice?: number;
  deliveryRange?: number;
  email?: string;
  openingHours: SettingHoursModel[];
  deliveryHours: SettingHoursModel[];
};

export type SettingHoursModel = {
  from: string;
  to: string;
};

export type OrderModel = {
  id: Guid;
  number: number;
  name: string;
  address: AddressModel;
  phone: string;
  cost: number;
  deliveryPrice?: number;
  payed: boolean;
  deliveryMethod: DeliveryMethod;
  status: Status;
  products?: OrderedProductModel[];
  totalProducts: number;
  completedProducts: number;
  deliveryAt: Date;
  createdAt: Date;
};

export type OrderedProductModel = {
  id: Guid;
  name: string;
  productType: ProductType;
  pizzaType?: PizzaType | null;
  price: number;
  quantity: number;
  ready: boolean;
  additionalIngredients: AdditionalIngredientModel[];
  removedIngredients: RemovedIngredientModel[];
  replacedIngredients: ReplacedIngredientModel[];
};

export type ProductModel = {
  id?: Guid;
  name: string;
  description?: string;
  price: number;
  productType: ProductType;
  pizzaType: PizzaType | null;
  ingredients: IngredientModel[];
  imageId?: Guid;
  imageUrl?: string;
};

export type IngredientModel = {
  id?: Guid;
  name: string;
  priceSmall: number;
  priceMedium: number;
  priceLarge: number;
};

export type AdditionalIngredientModel = {
  ingredientId: Guid;
  name: string;
  quantity: number;
};

export type RemovedIngredientModel = {
  ingredientId: Guid;
  name: string;
};

export type ReplacedIngredientModel = {
  fromIngredientId: Guid;
  fromName: string;
  toIngredientId: Guid;
  toName: string;
};

export type AddressModel = {
  city?: string;
  homeNumber?: string;
  street?: string;
  flatNumber?: string;
  floor?: string;
  text?: string;
};

export type ReservationModel = {
  id: Guid;
  number: number;
  reservationDate: Date;
  numberOfPeople: number;
  phone: string;
  email: string;
  name: string;
  comments: string;
  status: ReservationStatus;
  createdAt: Date;
  emailSent: boolean;
};

export enum PizzaType {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

export enum DeliveryMethod {
  Delivery = "Delivery",
  TakeAway = "TakeAway",
}

export enum SizeType {
  Small = "Small",
  Medium = "Medium",
  Big = "Big",
}

export enum CakeType {
  Thin = "Thin",
  Thick = "Thick",
}

export enum ProductType {
  Pizza = "Pizza",
  Drink = "Drink",
  Sauce = "Sauce",
  Snack = "Snack",
}

export enum Status {
  Waiting = "Waiting",
  Preparing = "Preparing",
  Ready = "Ready",
}

export enum ReservationStatus {
  Cancelled = "Cancelled",
  Waiting = "Waiting",
  Sent = "Sent",
  ConfirmedByPhone = "ConfirmedByPhone",
}

export enum ProductStatus {
  Product = "Product",
  Ingredient = "Ingredient",
}

export const productTypeToSize = (type?: PizzaType | null) => {
  switch (type) {
    case PizzaType.Large:
      return "Duża";
    case PizzaType.Medium:
      return "Średnia";
    case PizzaType.Small:
      return "Mała";
    default:
      return "-";
  }
};
