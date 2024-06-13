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
  products?: ProductModel2[];
  totalProducts: number;
  completedProducts: number;
  deliveryAt: Date;
  createdAt: Date;
};

export type ProductModel = {
  id: Guid;
  name: string;
  sizeType?: SizeType;
  cakeType?: CakeType;
  productType: ProductType;
  parentNumber: number;
  checked?: boolean;
};

export type ProductModel2 = {
  id: Guid;
  name: string;
  productType: ProductType2;
  pizzaType?: PizzaType | null;
  price: number;
  quantity: number;
  ready: boolean;
  additionalIngredients: AdditionalIngredientModel[];
  removedIngredients: RemovedIngredientModel[];
  replacedIngredients: ReplacedIngredientModel[];
};

export type ProductModel3 = {
  id?: Guid;
  name: string;
  description?: string;
  price: number;
  productType: ProductType2;
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
  Small,
  Medium,
  Large,
}

export enum DeliveryMethod {
  Delivery,
  TakeAway,
  DinningIn,
}

export enum SizeType {
  Small,
  Medium,
  Big,
}

export enum CakeType {
  Thin,
  Thick,
}

export enum ProductType {
  Pizza,
  Drink,
}

export enum ProductType2 {
  Pizza,
  Drink,
  Sauce,
  Snack,
}

export enum Status {
  Waiting,
  Preparing,
  Ready,
}

export enum ReservationStatus {
  Cancelled,
  Waiting,
  Sent,
  ConfirmedByPhone,
}

export enum ProductStatus {
  Product,
  Ingredient,
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
