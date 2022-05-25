import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router} from 'react-router-dom';
import PageNotFound from './page-not-found';

describe('component: PageNotFound', () => {
  it('Should render correctly', () => {

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <PageNotFound />
      </Router>,
    );

    const headerElement = screen.getByText(/404. Page not found/i);
    const linkElement = screen.getByText(/Вернуться на главную страницу/i);
    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();

  });

});
