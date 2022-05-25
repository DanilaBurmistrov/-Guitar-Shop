import { Middleware } from '@reduxjs/toolkit';
import { browserHistory } from '../../browser-history';
import { rootReducer } from '../root-reduser';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer>=
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === 'redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
