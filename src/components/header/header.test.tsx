import { configureMockStore } from '@jedmao/redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import Header from './header';

const mockStore = configureMockStore([...getDefaultMiddleware()]);

describe('component: Header', () => {
  it('Renders Header-component', () => {

    const store = mockStore({
      DATA: {
        guitars: [],
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: true,
      },
      SITE: {totalGuitarsCount: 0},
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
      </Provider>
    );

    expect(screen.getByText(/Где купить?/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/что вы ищите?/i)).toBeInTheDocument();
  });
});
