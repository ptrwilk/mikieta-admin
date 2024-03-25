export enum Status {
  Waiting,
  Preparing,
  Ready,
}

export type OrderModel = {
  number: number;
  name: string;
  address: string;
  phone: string;
  cost: number;
  payed: boolean;
  onSitePickup: boolean;
  status: Status;
};
