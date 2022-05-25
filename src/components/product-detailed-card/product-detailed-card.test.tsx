import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router} from 'react-router-dom';
import { makeFakeGuitar } from '../utils/test-mocks';
import ProductDetailedCard from './product-detailed-card';

describe('component: ProductDetailedCard', () => {
  it('Should render correctly', () => {
    const mockGuitar = makeFakeGuitar();

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <ProductDetailedCard guitar={mockGuitar}/>
      </Router>,
    );

    const titleElement = screen.getByText(new RegExp(mockGuitar.name, 'i'));
    const buttonElement = screen.getByText(/Добавить в корзину/i);
    expect(titleElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();

  });

});
