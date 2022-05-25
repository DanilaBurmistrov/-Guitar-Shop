import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router, Routes} from 'react-router-dom';
import CatalogScreen from './catalog-screen';
import * as Redux from 'react-redux';
import { makeFakeGuitar } from '../utils/test-mocks';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

describe('component: CatalogScreen', () => {

  it('Should render page 1 correctly', () => {

    const mockStore = configureMockStore([...getDefaultMiddleware()]);

    const history = createMemoryHistory();

    const route = '/catalog/page_1';

    history.push(route);

    const store = mockStore({
      DATA: {
        guitars: [makeFakeGuitar(), makeFakeGuitar()],
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: true,
      },
      SITE: {totalGuitarsCount: 2},
    });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path='/catalog/page_:pageNumber'
              element={<CatalogScreen />}
            />
          </Routes>
        </Router>
      </Provider>,
    );

    expect(useDispatch).toBeCalled();

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();

  });
});
