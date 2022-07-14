import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import userEvent from '@testing-library/user-event';
import { makeFakeGuitar } from '../utils/test-mocks';
import { INITIAL_GUITAR } from '../../const';
import ModallAdd from './modal-add';
import { Provider } from 'react-redux';
import { Router} from 'react-router-dom';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const mockGuitar = makeFakeGuitar();
const store = mockStore({
  BASKET: {
    guitars: [],
    guitarToAdd: INITIAL_GUITAR,
    guitarToDelete: INITIAL_GUITAR,
    discount: 0,
  }});

describe('component: ModalAdd', () => {
  it('Should render correctly', () => {
    const handleSetIsAddToBasketModalOpened = jest.fn();
    const handleSetIsAModalAddSuccessOpened = jest.fn();

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <ModallAdd
            setIsAddToBasketModalOpened={handleSetIsAddToBasketModalOpened}
            setIsAModalAddSuccessOpened={handleSetIsAModalAddSuccessOpened}
            guitar={mockGuitar}
          />
        </Router>,
      </Provider>
    );

    const buttonElement = screen.getByText(/Добавить в корзину/i);
    expect(buttonElement).toBeInTheDocument();

    userEvent.click(buttonElement);
    expect(handleSetIsAddToBasketModalOpened).toBeCalled();

  });

});
