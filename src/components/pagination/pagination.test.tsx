import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Router, Routes} from 'react-router-dom';
import Pagination from './pagination';

describe('component: Pagination', () => {

  it('Should render page 1 with total number guitars 15 correctly', () => {

    const history = createMemoryHistory();
    const route = '/catalog/page_1';
    history.push(route);

    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path='/catalog/page_:pageNamber'
            element={<Pagination totalGuitarsCount={15}/>}
          />
        </Routes>
      </Router>,
    );

    const pageLinkElement = screen.getByText(/2/i);
    expect(pageLinkElement).toBeInTheDocument();
    const pagesButtons = screen.getAllByTestId('page');

    expect(pagesButtons[0]).toHaveClass('pagination__page--active');
    expect(screen.queryByText(/Назад/i)).not.toBeInTheDocument();

  });

  it('Should render page 3 with total guitars 27 correctly', () => {

    const history = createMemoryHistory();
    const route = '/catalog/page_3';
    history.push(route);

    render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path='/catalog/page_:pageNamber'
            element={<Pagination totalGuitarsCount={27}/>}
          />
        </Routes>
      </Router>,
    );

    const pageLinkElement = screen.getByText(/3/i);
    expect(pageLinkElement).toBeInTheDocument();
    const pagesButtons = screen.getAllByTestId('page');

    expect(pagesButtons[2]).toHaveClass('pagination__page--active');
    expect(screen.queryByText(/Далее/i)).not.toBeInTheDocument();

  });

});
