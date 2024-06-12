const token = () => `Bearer ${localStorage.getItem("token")}` ?? "";

import { OrderModel, ReservationModel } from "./types";

const url = import.meta.env.VITE_API_URL;

export const get = (path: string, convert?: (item: any) => any) => {
  return fetch(`${url}/${path}`, {
    method: "GET",
    headers: {
      Authorization: token(),
    },
  }).then(async (response) => {
    const res = await response.json();

    if (isArray(res) && convert) {
      const array = res as any[];
      const newArray: any[] = [];

      array.forEach((item) => {
        newArray.push(convert(item));
      });

      return newArray;
    } else if (convert) {
      return convert(res);
    }

    return res;
  });
};

export const post = (path: string, body: any, convert?: (item: any) => any) =>
  execute("POST", path, body, convert);
export const put = (path: string, body: any, convert?: (item: any) => any) =>
  execute("PUT", path, body, convert);
export const del = (path: string) => execute("DELETE", path, null, undefined);

const execute = (
  method: string,
  path: string,
  body: any,
  convert?: (item: any) => any
) => {
  var isFormData = body instanceof FormData;

  return fetch(`${url}/${path}`, {
    method: method,
    headers: isFormData
      ? {
          Authorization: token(),
        }
      : {
          "Content-Type": "application/json",
          Authorization: token(),
        },
    body: isFormData ? body : JSON.stringify(body),
  }).then(async (response) => {
    const res = await response.json();

    if (isArray(res) && convert) {
      const array = res as any[];
      const newArray: any[] = [];

      array.forEach((item) => {
        newArray.push(convert(item));
      });

      return newArray;
    } else if (convert) {
      return convert(res);
    }

    return res;
  });
};

const convertOrderModel = (item: OrderModel) => {
  return {
    ...item,
    createdAt: new Date(item.createdAt),
    deliveryAt: new Date(item.deliveryAt),
  };
};

const convertReservationModel = (item: ReservationModel) => {
  return {
    ...item,
    reservationDate: new Date(item.reservationDate),
  };
};

export const getOrders = () => get("order", convertOrderModel);
export const putOrder = (item: OrderModel) =>
  put("order", item, convertOrderModel);

export const getReservations = () =>
  get("reservation", convertReservationModel);
export const putReservation = (item: ReservationModel) =>
  put("reservation", item, convertReservationModel);

function isArray(value: any) {
  return value instanceof Array;
}
