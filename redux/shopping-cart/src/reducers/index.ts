import { combineReducers } from "redux";

import cart, { getAddedIds, getQuantity } from "./cart";
import products, { getProduct } from "./products";

export default combineReducers({
  cart,
  products
});

export const getTotal = (state: any) =>
  getAddedIds(state)
    .reduce(
      (total: number, id: number) =>
        total + getProduct(state, id).price * getQuantity(state, id),
      0
    )
    .toFixed(2);

export const getCartProducts = (state: any) =>
  getAddedIds(state).map((id: number) => ({
    ...getProduct(state, id),
    quantity: getQuantity(state, id)
  }));
