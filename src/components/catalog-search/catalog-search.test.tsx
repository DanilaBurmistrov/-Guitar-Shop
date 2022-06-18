import { configureMockStore } from '@jedmao/redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-router/history-router';
import CatalogSearch from './catalog-search';
import { makeFakeGuitar } from '../utils/test-mocks';

const mockStore = configureMockStore([...getDefaultMiddleware()]);

const history = createMemoryHistory();

describe('Component: CatalogSearch', () => {
  it('should render correctly without additional props', () => {
    const store = mockStore({
      DATA: {
        guitars: [makeFakeGuitar(), makeFakeGuitar()],
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: true,
      },
      SITE: {totalGuitarsCount: 2},
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogSearch />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('should reset search input when user click reset button', async () => {
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
        <HistoryRouter history={history}>
          <CatalogSearch />
        </HistoryRouter>
      </Provider>
    );

    const user = userEvent;

    user.type(screen.getByTestId('search-input'), 'testName');

    expect(screen.getByTestId('search-input')).toHaveValue('testName');

    user.click(screen.getByTestId('reset-search'));

    expect(screen.queryByText('testName')).not.toBeInTheDocument();
  });
});
