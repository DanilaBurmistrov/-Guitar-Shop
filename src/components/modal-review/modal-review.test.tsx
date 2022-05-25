import { configureMockStore } from '@jedmao/redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router} from 'react-router-dom';
import { makeFakeGuitar } from '../utils/test-mocks';
import ModalReview from './modal-review';

describe('component: ModalReview', () => {
  it('Should render ModalReview correctly', () => {
    const mockGuitar = makeFakeGuitar();
    const handleSetIsSuccessReviewModalOpened = jest.fn();
    const handleSetIsFormModalOpened = jest.fn();

    const history = createMemoryHistory();

    const mockStore = configureMockStore([...getDefaultMiddleware()]);

    const store = mockStore({
      DATA: {
        guitars: [],
        isGuitarsDataLoaded: true,
        oneGuitarCard: mockGuitar,
        isOneGuitarCardDataLoaded: true,
      },
      SITE: {totalGuitarsCount: 0},
    });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <ModalReview
            setIsSuccessReviewModalOpened={handleSetIsSuccessReviewModalOpened}
            setIsFormModalOpened={handleSetIsFormModalOpened}
            guitarName={mockGuitar.name}
            id={mockGuitar.id}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Ваше Имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('user'), 'testov');
    userEvent.type(screen.getByTestId('advantage'), 'Advant');
    userEvent.type(screen.getByTestId('disadvantage'), 'Dis');
    userEvent.type(screen.getByTestId('comment'), 'Comment');

    expect(screen.getByDisplayValue(/testov/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Advant/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Dis/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Comment/i)).toBeInTheDocument();

    expect(screen.getByTestId(/close/i)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(/close/i));
    expect(handleSetIsFormModalOpened).toBeCalled();

  });

});
