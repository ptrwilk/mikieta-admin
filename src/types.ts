export enum Status {
  Waiting,
  Preparing,
  Ready,
}

export type OrderModel = {
  id: string;
  number: number;
  name: string;
  address: string;
  phone: string;
  cost: number;
  payed: boolean;
  onSitePickup: boolean;
  status: Status;
  products?: ProductModel2[];
};

export type ProductModel = {
  id: string;
  name: string;
  sizeType?: SizeType;
  cakeType?: CakeType;
  productType: ProductType;
  parentNumber: number;
  checked?: boolean;
};

export type ProductModel2 = {
  id: string;
  name: string;
  type: ProductType2;
  price: number;
  checked: boolean;
};

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
  PizzaSmall,
  PizzaMedium,
  PizzaBig,
  Drink,
  Sauce,
  Snack,
}
