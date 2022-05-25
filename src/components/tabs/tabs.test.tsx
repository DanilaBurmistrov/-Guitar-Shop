import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router} from 'react-router-dom';
import { makeFakeGuitar } from '../utils/test-mocks';
import Tabs from './tabs';

describe('component: Tabs', () => {
  it('Renders Tabs description', () => {
    const mockGuitar = makeFakeGuitar();

    const history = createMemoryHistory();
    history.push('#description');
    render(
      <Router location={history.location} navigator={history}>
        <Tabs
          guitar={mockGuitar}
        />
      </Router>,
    );

    const linkCharacteristics = screen.getByText(/Характеристики/i);
    const linkDescription = screen.getByText(/Описание/i);
    expect(linkCharacteristics).toBeInTheDocument();
    expect(linkDescription).toBeInTheDocument();
    const description = screen.getByText(new RegExp(mockGuitar.description, 'i'));
    expect(description).toBeInTheDocument();

  });

  it('Renders Tabs characteristics', () => {
    const mockGuitar = makeFakeGuitar();

    const history = createMemoryHistory();
    history.push('#characteristics');
    render(
      <Router location={history.location} navigator={history}>
        <Tabs
          guitar={mockGuitar}
        />
      </Router>,
    );

    const linkCharacteristics = screen.getByText(/Характеристики/i);
    const linkDescription = screen.getByText(/Описание/i);
    expect(linkCharacteristics).toBeInTheDocument();
    expect(linkDescription).toBeInTheDocument();
    const characteristics = screen.getByText(new RegExp(mockGuitar.vendorCode, 'i'));
    expect(characteristics).toBeInTheDocument();
  });

});
