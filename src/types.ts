export enum Status {
  Waiting,
  Preparing,
  Ready,
}

export type OrderModel = {
  id: string;
  number: number;
  name: string;
  address: AddressModel;
  phone: string;
  cost: number;
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
  quantity: number;
  ready: boolean;
};

export type AddressModel = {
  city?: string;
  homeNumber?: string;
  street?: string;
  flatNumber?: string;
  floor?: string;
  text?: string;
};

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
  PizzaSmall,
  PizzaMedium,
  PizzaBig,
  Drink,
  Sauce,
  Snack,
}
