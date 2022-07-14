import { createSelector } from 'reselect';
import { NameSpace } from '../const';
import { State } from '../types/state';
import { Guitar, Guitars } from '../types/types';

export const getGuitarsDataLoadedStatus = (state: State): boolean => state[NameSpace.Data].isGuitarsDataLoaded;

export const getOneGuitarCard = (state: State): Guitar | null => state[NameSpace.Data].oneGuitarCard;

export const getOneGuitarCardDataLoadedStatus = (state: State): boolean => state[NameSpace.Data].isOneGuitarCardDataLoaded;

export const getTotalGuitarsCount = (state: State): number => state[NameSpace.Site].totalGuitarsCount;

export const getSearchResultGuitars = (state: State): Guitars => state[NameSpace.Data].searchResult;

export const selectBasketGuitars = (state: State) => state[NameSpace.Basket].guitars;

const selectTaxPercent = (state: State) => state[NameSpace.Basket].discount;

export const selectSubtotal = createSelector(selectBasketGuitars, (items) => items.reduce((subtotal, item) => subtotal + item.price * item.count, 0));

export const selectDiscount = createSelector(selectSubtotal, selectTaxPercent, (subtotal, discountPercent) => subtotal * (discountPercent / 100));

export const selectTotal = createSelector(selectSubtotal, selectDiscount, (subtotal, discount) => subtotal - discount);
