import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router} from 'react-router-dom';
import ModalSuccessReview from './modal-success-review';

describe('component: ModalSuccessReview', () => {
  it('Should render correctly', () => {
    const handleSetIsSuccessReviewModalOpened = jest.fn();

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <ModalSuccessReview
          setIsSuccessReviewModalOpened={handleSetIsSuccessReviewModalOpened}
        />
      </Router>,
    );

    const buttonElement = screen.getByText(/К покупкам!/i);
    expect(buttonElement).toBeInTheDocument();

    userEvent.click(buttonElement);
    expect(handleSetIsSuccessReviewModalOpened).toBeCalled();

  });

});
