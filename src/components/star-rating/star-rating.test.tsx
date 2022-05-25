import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import StarRating from './star-rating';

describe('component: StarRating', () => {
  it('Renders StarRating-component', () => {

    const mockRating = 2;

    render(
      <BrowserRouter>
        <StarRating
          ratingNumber={mockRating}
        />
      </BrowserRouter>,
    );
    const starsElements = screen.getAllByTitle('Star');
    expect(starsElements[0]).toBeInTheDocument();
    expect(starsElements[4]).toBeInTheDocument();

  });
});
