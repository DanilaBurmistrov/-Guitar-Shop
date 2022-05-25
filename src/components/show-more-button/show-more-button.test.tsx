import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {BrowserRouter} from 'react-router-dom';
import { ShowMoreButton } from './show-more-button';


describe('component: ShowMoreButton', () => {
  it('Renders ShowMoreButton-component', () => {

    const showMorebuttonClickHandler = jest.fn();

    render(
      <BrowserRouter>
        <ShowMoreButton
          onClick={showMorebuttonClickHandler}
        />
      </BrowserRouter>,
    );

    const textButtonElement = screen.getByText(/Показать еще отзывы/i);
    expect(textButtonElement).toBeInTheDocument();

    userEvent.click(textButtonElement);
    expect(showMorebuttonClickHandler).toBeCalled();

  });
});
