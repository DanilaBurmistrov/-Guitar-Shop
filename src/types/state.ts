import { store } from '../store';
import { Guitar, Guitars } from './types';

export type GuitarsProcess = {
  guitars: Guitars
  isGuitarsDataLoaded: boolean
  oneGuitarCard: Guitar | null
  isOneGuitarCardDataLoaded: boolean
  error: string
};

export type SiteProcess = {
  totalGuitarsCount: number
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
