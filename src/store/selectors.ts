import { NameSpace } from '../const';
import { State } from '../types/state';
import { Guitar } from '../types/types';

export const getGuitarsDataLoadedStatus = (state: State): boolean => state[NameSpace.Data].isGuitarsDataLoaded;

export const getOneGuitarCard = (state: State): Guitar | null => state[NameSpace.Data].oneGuitarCard;

export const getOneGuitarCardDataLoadedStatus = (state: State): boolean => state[NameSpace.Data].isOneGuitarCardDataLoaded;

export const getTotalGuitarsCount = (state: State): number => state[NameSpace.Site].totalGuitarsCount;

