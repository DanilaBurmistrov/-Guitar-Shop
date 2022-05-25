import { makeFakeGuitar } from '../../components/utils/test-mocks';
import { loadTotalGuitarsCount, siteProcessData } from './site-process-data';

const guitars = [makeFakeGuitar(), makeFakeGuitar()];

describe('Reducer: Data', () => {
  it('without additional parameters should return initial state', () => {
    expect(siteProcessData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        totalGuitarsCount: 0,
      });
  });
  it('should update totalGuitarsCount by load x-total-count', () => {
    const state = {
      totalGuitarsCount: 0,
    };
    expect(siteProcessData.reducer(state, loadTotalGuitarsCount(guitars.length)))
      .toEqual({
        totalGuitarsCount: guitars.length,
      });
  });
});
