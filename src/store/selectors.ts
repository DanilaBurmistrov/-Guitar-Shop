import { NameSpace } from '../const';
import { State } from '../types/state';
import { Guitar, Guitars } from '../types/types';

export const getGuitars = (state: State): Guitars => state[NameSpace.Data].guitars;

export const getGuitarsDataLoadedStatus = (state: State): boolean => state[NameSpace.Data].isGuitarsDataLoaded;

export const getOneGuitarCard = (state: State): Guitar | null => state[NameSpace.Data].oneGuitarCard;

export const getOneGuitarCardDataLoadedStatus = (state: State): boolean => state[NameSpace.Data].isOneGuitarCardDataLoaded;

export const getTotalGuitarsCount = (state: State): number => state[NameSpace.Site].totalGuitarsCount;

