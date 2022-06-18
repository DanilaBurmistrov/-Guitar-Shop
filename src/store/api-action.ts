import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api, api, store } from '.';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { handleError } from '../services/handle-error';
import { NewComment } from '../types/types';
import { redirectToRoute } from './action';
import { loadGuitars, loadOneGuitarCard, loadPostedComment, setError, loadSortedGuitars } from './guitars-process-data/guitars-process-data';
import { loadTotalGuitarsCount } from './site-process-data/site-process-data';

export const fetchGuitars = createAsyncThunk(
  'fetchGuitars',
  async ([pageId, start, end, filterParams, sortParams, priceParams]: [string | undefined, number, number, string, string, string]) => {
    let startCount = 0;
    if(pageId) {
      startCount = Number(pageId) * 9 - 9;
    }
    try {
      const result = await api.get(`/guitars?_start=${start}&_end=${end}${filterParams}${sortParams}${priceParams}&_embed=comments&_start=${startCount}&_limit=27`);
      const sortedGuitars = await api.get(`${APIRoute.Guitars}?_sort=price${filterParams}`);
      store.dispatch(setError(''));
      store.dispatch(loadGuitars(result.data));
      store.dispatch(loadSortedGuitars(sortedGuitars.data));
      const resultHeaders = result.headers;
      store.dispatch(loadTotalGuitarsCount(resultHeaders['x-total-count']));
    } catch (error) {
      handleError(error);
      store.dispatch(loadGuitars([]));
      store.dispatch(redirectToRoute('/500'));
    }
  },
);

export const fetchOneGuitarCard = createAsyncThunk(
  'fetchOneGuitarCard',
  async (guitarId: string) => {
    try {
      const {data} = await api.get(`/guitars/${guitarId}?_embed=comments`);
      store.dispatch(setError(''));
      store.dispatch(loadOneGuitarCard(data));
    } catch (error) {
      handleError(error);
    }
  },
);

export const clearError = createAsyncThunk<void, undefined, {extra: Api}>(
  'clearError',
  (_, {dispatch}) => {
    setTimeout(
      () => dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const addNewComment = createAsyncThunk(
  'addNewComment',
  async ({comment, setIsSaving, setIsSuccessReviewModalOpened, setIsFormModalOpened}: NewComment) => {
    try {
      const {data} = await api.post(APIRoute.Comments, {...comment});
      store.dispatch(loadPostedComment(data));
      setIsSaving(false);
      setIsFormModalOpened(false);
      setIsSuccessReviewModalOpened(true);
    } catch(error) {
      setIsSaving(false);
      handleError(error);
    }
  },
);
