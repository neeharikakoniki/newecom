import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../index";


export type Product = {
  id: number;
  title: string;
  description?: string;
  price: number; 
  thumbnail?: string;
};

export type CartItem = {
  product: Product;
  qty: number;
};

type CartState = {
  items: Record<number, CartItem>; 
};

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const p = action.payload;
      const existing = state.items[p.id];
      if (existing) {
        existing.qty += 1;
      } else {
        state.items[p.id] = { product: p, qty: 1 };
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      delete state.items[action.payload];
    },
    incrementQty: (state, action: PayloadAction<number>) => {
      const item = state.items[action.payload];
      if (item) item.qty += 1;
    },
    decrementQty: (state, action: PayloadAction<number>) => {
      const item = state.items[action.payload];
      if (!item) return;
      item.qty -= 1;
      if (item.qty <= 0) delete state.items[action.payload];
    },
    setQty: (state, action: PayloadAction<{ id: number; qty: number }>) => {
      const { id, qty } = action.payload;
      const item = state.items[id];
      if (!item) return;
      if (qty <= 0) delete state.items[id];
      else item.qty = qty;
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  setQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

const selectCart = (state: RootState) => state.cart;

export const selectCartArray = createSelector([selectCart], (cart) =>
  Object.values(cart.items)
);

export const selectTotalItems = createSelector([selectCartArray], (arr) =>
  arr.reduce((sum, it) => sum + it.qty, 0)
);

export const selectSubtotal = createSelector([selectCartArray], (arr) =>
  arr.reduce((sum, it) => sum + it.qty * it.product.price, 0)
);
