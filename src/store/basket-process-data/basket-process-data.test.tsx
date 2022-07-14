import { makeFakeInitialGuitar } from '../../components/utils/test-mocks';
import { INITIAL_GUITAR } from '../../const';
import { BasketProcess } from '../../types/state';
import { addToBasket, basketProcessData, deleteGuitarFromBasket, raiseGuitarQuantity, reduceGuitarQuantity, setDiscount, setGuitarQuantity } from './basket-process-data';

describe('Reducer: Basket-process-data', () => {
  const state: BasketProcess = {
    guitars: [],
    guitarToAdd: INITIAL_GUITAR,
    guitarToDelete: INITIAL_GUITAR,
    discount: 0,
  };
  const guitar = makeFakeInitialGuitar;

  it('without additional parameters should return initial state', () => {
    expect(basketProcessData.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  it('should add guitar to guitars', () => {
    const changedState = { ...state };

    expect(basketProcessData.reducer(changedState, addToBasket(guitar.id))).toEqual({ ...state, guitars: [{ ...guitar, count: 1 }] });
  });

  it('should increase guitar count', () => {
    const changedState = { ...state, guitars: [guitar] };

    expect(basketProcessData.reducer(changedState, raiseGuitarQuantity(guitar))).toEqual({ ...state, guitars: [{ ...guitar, count: 1 }] });
  });

  it('should reduce guitar count', () => {
    const changedState = { ...state, guitars: [{ ...guitar, count: 3 }] };

    expect(basketProcessData.reducer(changedState, reduceGuitarQuantity({ id: guitar.id }))).toEqual({ ...state, guitars: [{ ...guitar, count: 2 }] });
  });

  it('should set guitar count', () => {
    const changedState = { ...state, guitars: [guitar] };

    expect(basketProcessData.reducer(changedState, setGuitarQuantity({ id: guitar.id, count: 20 }))).toEqual({ ...state, guitars: [{ ...guitar, count: 20 }] });
  });

  it('should delete guitar from basket', () => {
    const changedState = { ...state, guitars: [guitar] };

    expect(basketProcessData.reducer(changedState, deleteGuitarFromBasket(guitar.id))).toEqual({ ...state, guitars: [] });
  });

  it('should set discount value', () => {
    const discount = 15;

    expect(basketProcessData.reducer(state, setDiscount(discount))).toEqual({ ...state, discount });
  });
});
