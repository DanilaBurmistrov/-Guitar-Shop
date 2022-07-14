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
import Basket from './basket';
import { INITIAL_GUITAR } from '../../const';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
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
      <Basket />
    </HistoryRouter>
  </Provider>
);

describe('Application Basket', () => {
  it('should render correctly', () => {
    render(fakeBasket);

    expect(screen.getAllByText(/Корзина/i)).toBeTruthy();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toBeTruthy();
    expect(screen.getAllByRole('link')).toBeTruthy();
  });

  it('is possible to enter a promocode and send it, receive a message in case of an error', async () => {
    render(fakeBasket);

    userEvent.type(screen.getByPlaceholderText('Введите промокод'), 'testCoupon');
    userEvent.click(screen.getByText('Применить'));
  });
});
