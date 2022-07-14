import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_GUITAR, NameSpace } from '../../const';
import { BasketProcess } from '../../types/state';

const initialState: BasketProcess = {
  guitars: [],
  guitarToAdd: INITIAL_GUITAR,
  guitarToDelete: INITIAL_GUITAR,
  discount: 0,
};

export const basketProcessData = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const guitarInBasket = state.guitars.findIndex((guitar) => guitar.id === action.payload.id);

      if (guitarInBasket < 0) {
        state.guitars.push({ ...action.payload, count: 1 });
      } else {
        state.guitars[guitarInBasket].count += 1;
      }
    },
    raiseGuitarQuantity: (state, action) => {
      const guitarInBasket = state.guitars.findIndex((guitar) => guitar.id === action.payload);

      if (state.guitars[guitarInBasket].count === 99) {
        return;
      }
      state.guitars[guitarInBasket].count += 1;
    },
    setGuitarQuantity: (state, action) => {
      const guitarInBasket = state.guitars.findIndex((guitar) => guitar.id === action.payload.id);

      state.guitars[guitarInBasket].count = action.payload.count;
    },
    reduceGuitarQuantity: (state, action) => {
      const guitarInBasket = state.guitars.findIndex((guitar) => guitar.id === action.payload.id);

      if (state.guitars[guitarInBasket].count === 1) {
        state.guitarToDelete = action.payload;
      } else {
        state.guitars[guitarInBasket].count -= 1;
      }
    },
    deleteGuitarFromBasket: (state, action) => {
      state.guitars = state.guitars.filter((guitar) => guitar.id !== action.payload);
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
  },
});

export const {addToBasket, raiseGuitarQuantity, setGuitarQuantity, reduceGuitarQuantity, deleteGuitarFromBasket, setDiscount} = basketProcessData.actions;
