export type Guid = string;

export type OrderModel = {
  id: Guid;
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
