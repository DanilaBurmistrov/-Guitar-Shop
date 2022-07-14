import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import HistoryRouter from '../history-router/history-router';
import userEvent from '@testing-library/user-event';
import BasketItem from './basket-item';
import { makeFakeInitialGuitar } from '../utils/test-mocks';
import { INITIAL_GUITAR } from '../../const';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const mockGuitar = makeFakeInitialGuitar;
const store = mockStore({
  BASKET: {
    guitars: [],
    guitarToAdd: INITIAL_GUITAR,
    guitarToDelete: INITIAL_GUITAR,
    discount: 0,
  }});

const history = createMemoryHistory();

const fakeBasket = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <BasketItem guitar={mockGuitar}/>
    </HistoryRouter>
  </Provider>
);

describe('Application BasketItem', () => {
  it('should reduce counter', async () => {
    render(fakeBasket);

    const input = screen.getByTestId('counter') as HTMLInputElement;

    userEvent.click(screen.getByTestId('minus-btn'));
    expect(input.value).toBe('1');
  });
  it('should increase counter', async () => {
    render(fakeBasket);

    const input = screen.getByTestId('counter') as HTMLInputElement;

    userEvent.click(screen.getByTestId('plus-btn'));
    expect(input.value).toBe('3');
  });
});
