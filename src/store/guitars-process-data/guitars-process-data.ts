import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { GuitarsProcess } from '../../types/state';
import { Guitars, Guitar } from '../../types/types';

const initialState: GuitarsProcess = {
  guitars: [],
  isGuitarsDataLoaded: false,
  oneGuitarCard: null,
  isOneGuitarCardDataLoaded: false,
  error: '',
  searchResult: [],
  sortedGuitars: [],
};

export const guitarsProcessData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadSearchResult: (state, action: PayloadAction<Guitars>) => {
      state.searchResult = action.payload;
    },
    loadSortedGuitars: (state, action: PayloadAction<Guitars>) => {
      state.sortedGuitars = action.payload;
    },
    loadGuitars: (state, action: PayloadAction<Guitars>) => {
      state.guitars = action.payload;
      state.isGuitarsDataLoaded = true;
    },
    loadOneGuitarCard: (state, action: PayloadAction<Guitar>) => {
      state.oneGuitarCard = action.payload;
      state.isOneGuitarCardDataLoaded = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    loadPostedComment: (state, action) => {
      if (state.oneGuitarCard) {
        state.oneGuitarCard.comments = [action.payload, ...state.oneGuitarCard.comments];
      }
    },
  }
});

export const {loadGuitars, loadOneGuitarCard, setError, loadPostedComment, loadSearchResult, loadSortedGuitars} = guitarsProcessData.actions;
