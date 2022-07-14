import { configureMockStore } from '@jedmao/redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router} from 'react-router-dom';
import InternalServerError from './internal-server-error';

describe('component: InternalServerError', () => {
  it('Should render correctly', () => {

    const history = createMemoryHistory();
    const mockStore = configureMockStore([...getDefaultMiddleware()]);
    const store = mockStore({
      DATA: {
        guitars: [],
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: true,
      },
    });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <InternalServerError />
        </Router>,
      </Provider>
    );

    const headerElement = screen.getByText(/500 Internal Server Error/i);
    expect(headerElement).toBeInTheDocument();

  });

});
