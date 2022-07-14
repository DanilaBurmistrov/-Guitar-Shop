import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import ModalAddSuccess from './modal-add-success';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const mockStore = configureMockStore([...getDefaultMiddleware()]);
const store = mockStore({
  DATA: {
    guitars: [],
    isGuitarsDataLoaded: true,
    oneGuitarCard: null,
    isOneGuitarCardDataLoaded: true,
  },
});

describe('component: ModalAddSuccess', () => {
  it('Should render correctly', () => {
    const handleSetIsAModalAddSuccessOpened = jest.fn();

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <ModalAddSuccess
            setIsAModalAddSuccessOpened={handleSetIsAModalAddSuccessOpened}
          />
        </Router>,
      </Provider>
    );

    expect(screen.getByText(/Перейти в корзину/)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/)).toBeInTheDocument();

  });
});
