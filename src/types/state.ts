import { store } from '../store';
import { Guitar, Guitars, InitialGuitar, InitialGuitars } from './types';

export type GuitarsProcess = {
  guitars: Guitars
  isGuitarsDataLoaded: boolean
  oneGuitarCard: Guitar | null
  isOneGuitarCardDataLoaded: boolean
  error: string
  searchResult: Guitars
  sortedGuitars: Guitars
};

export type SiteProcess = {
  totalGuitarsCount: number,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type BasketProcess = {
  guitars: InitialGuitars,
  guitarToAdd: InitialGuitar,
  guitarToDelete: InitialGuitar,
  discount: number,
};
