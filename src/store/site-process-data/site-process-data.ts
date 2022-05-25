import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, TOTAL_GUITAR_COUNT } from '../../const';
import { SiteProcess } from '../../types/state';

const initialState: SiteProcess = {
  totalGuitarsCount: 0,
};

export const siteProcessData = createSlice({
  name: NameSpace.Site,
  initialState,
  reducers: {
    loadTotalGuitarsCount: (state, action) => {
      if(action.payload <= TOTAL_GUITAR_COUNT) {
        state.totalGuitarsCount = action.payload;
      }
      else {
        state.totalGuitarsCount = TOTAL_GUITAR_COUNT;
      }
    }
  }
});

export const {loadTotalGuitarsCount} = siteProcessData.actions;
