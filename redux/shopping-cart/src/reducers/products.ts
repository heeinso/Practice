import { combineReducers } from "redux";

import { RECEIVE_PRODUCTS, ADD_TO_CART } from "../constants/ActionTypes";

interface IProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

const products = (state: any, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        inventory: state.inventory - 1
      };
    default:
      return state;
  }
};

const byId = (state: any = {}, action: any) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj: any, product: any) => {
          obj[product.id] = product;
          return obj;
        }, {})
      };
    default:
      const { productId } = action;
      if (productId) {
        return {
          ...state,
          [productId]: products(state[productId], action)
        };
      }
      return state;
  }
};

const visibleIds = (state: any = [], action: any) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map((product: IProduct) => product.id);
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  visibleIds
});

export const getProduct = (state: any, id: number) => state.byId[id];

export const getVisibleProducts = (state: any) =>
  state.visibleIds.map((id: number) => getProduct(state, id));
