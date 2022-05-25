import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import { makeFakeReview } from '../utils/test-mocks';
import ProductReview from './product-review';

describe('component: ProductReview', () => {
  it('Renders ProductReview-component', () => {
    const mockReview = makeFakeReview();

    render(
      <BrowserRouter>
        <ProductReview
          review={mockReview}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Комментарий:/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства:/i)).toBeInTheDocument();
  });
});
