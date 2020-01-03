import _products from "./products.json";

const TIMEOUT = 100;

export default {
  getProducts: (cb: any, timeout?: number) =>
    setTimeout(() => cb(_products), timeout || TIMEOUT),
  buyProducts: (payload: any, cb: any, timeout?: number) =>
    setTimeout(() => cb(), timeout || TIMEOUT)
};
