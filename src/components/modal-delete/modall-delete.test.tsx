import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import ModalDelete from './modal-delete';
import { makeFakeInitialGuitar } from '../utils/test-mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { INITIAL_GUITAR } from '../../const';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';

const mockGuitar = makeFakeInitialGuitar;
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

describe('component: ModalDelete', () => {
  it('Should render correctly', () => {
    const handleSetIsDeleteModalOpened = jest.fn();

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <ModalDelete
            setIsDeleteModalOpened={handleSetIsDeleteModalOpened}
            guitar={mockGuitar}
          />
        </Router>,
      </Provider>
    );

    expect(screen.getByText(/Удалить товар/)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/)).toBeInTheDocument();

  });
});
