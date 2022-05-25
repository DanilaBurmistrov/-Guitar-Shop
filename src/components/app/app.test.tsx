import {render, screen} from '@testing-library/react';
import App from './app';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Router} from 'react-router-dom';
import { makeFakeGuitar } from '../utils/test-mocks';


describe('Application Routing', () => {

  it('should render MainScreen when navigate to "/"', () => {

    const mockStore = configureMockStore();

    const store = mockStore({
      DATA: {
        guitars: [],
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: true,
      },
      SITE: {totalGuitarsCount: 0},
    });

    const history = createMemoryHistory();
    history.push('/');
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/О нас/i)).toBeInTheDocument();

  });
  it('should render ProductPage when navigate to "/product/1"', () => {
    const mockStore = configureMockStore();

    const store = mockStore({
      DATA: {
        guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: makeFakeGuitar(),
        isOneGuitarCardDataLoaded: true,
      },
      SITE: {totalGuitarsCount: 0},
    });

    const history = createMemoryHistory();
    history.push('/product/1');
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByText(/Наверх/i)).toBeInTheDocument();

  });
  it('should render PageNotFound when navigate to non-existent-route', () => {
    const mockStore = configureMockStore();

    const store = mockStore({
      DATA: {
        guitars: [],
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: true,
      },
      SITE: {totalGuitarsCount: 0},
    });

    const history = createMemoryHistory();
    history.push('/non-existent-route');
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>,
    );

    const headerElement = screen.getByText(/404. Page not found/i);
    const linkElement = screen.getByText(/Вернуться на главную страницу/i);
    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();

  });
});
