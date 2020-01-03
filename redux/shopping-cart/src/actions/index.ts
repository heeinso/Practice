import shop from "../api/shop";
import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE,
  RECEIVE_PRODUCTS
} from "../constants/ActionTypes";

interface IProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

const receiveProducts = (products: IProduct[]) => ({
  type: RECEIVE_PRODUCTS,
  products
});

export const getAllProducts = () => dispatch => {
  shop.getProducts((products: IProduct[]) => {
    dispatch(receiveProducts(products));
  });
};

const addToCartUnsafe = (productId: number) => ({
  type: ADD_TO_CART,
  productId
});

export const addToCart = (productId: number) => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId));
  }
};

export const checkout = (products: IProduct[]) => (dispatch, getState) => {
  const { cart } = getState();

  dispatch({
    type: CHECKOUT_REQUEST
  });

  shop.buyProducts(products, () => {
    dispatch({
      type: CHECKOUT_SUCCESS,
      cart
    });
  });
};
