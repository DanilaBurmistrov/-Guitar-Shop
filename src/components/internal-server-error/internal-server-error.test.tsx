import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router} from 'react-router-dom';
import InternalServerError from './internal-server-error';

describe('component: InternalServerError', () => {
  it('Should render correctly', () => {

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <InternalServerError />
      </Router>,
    );

    const headerElement = screen.getByText(/500 Internal Server Error/i);
    expect(headerElement).toBeInTheDocument();

  });

});
