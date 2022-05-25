import { HttpCode } from '../const';
import { store } from '../store';
import { setError } from '../store/guitars-process-data/guitars-process-data';
import { ErrorType } from '../types/types';
import request from 'axios';
import { clearError } from '../store/api-action';

export const handleError = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HttpCode.BAD_REQUEST:
      case HttpCode.NOT_FOUND: {
        store.dispatch(setError(response.headers.error));
        store.dispatch(clearError());
        break;
      }
      default: store.dispatch(setError('Something went wrong. Please try again'));
        store.dispatch(clearError());
        break;
    }
  }
};
