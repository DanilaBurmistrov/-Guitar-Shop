import { makeFakeGuitar, makeFakeReview } from '../../components/utils/test-mocks';
import { guitarsProcessData, loadGuitars, loadOneGuitarCard, loadPostedComment, setError } from './guitars-process-data';

const guitars = [makeFakeGuitar(), makeFakeGuitar()];

const guitar = makeFakeGuitar();

const commentPost = makeFakeReview();

const guitarWithCommentPost = {...guitar};

guitarWithCommentPost.comments = [commentPost, ...guitarWithCommentPost.comments];

const fakeErrorStatus = '404';

describe('Reducer: Data', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarsProcessData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
        error: '',
      });
  });
  it('should update guitars by load guitars', () => {
    const state = {
      guitars: [],
      isGuitarsDataLoaded: false,
      oneGuitarCard: null,
      isOneGuitarCardDataLoaded: false,
      error: '',
    };
    expect(guitarsProcessData.reducer(state, loadGuitars(guitars)))
      .toEqual({
        guitars: guitars,
        isGuitarsDataLoaded: true,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
        error: '',
      });
  });
  it('should update guitar by load guitar', () => {
    const state = {guitars: [],
      isGuitarsDataLoaded: false,
      oneGuitarCard: null,
      isOneGuitarCardDataLoaded: false,
      error: '',
    };
    expect(guitarsProcessData.reducer(state, loadOneGuitarCard(guitar)))
      .toEqual({guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: guitar,
        isOneGuitarCardDataLoaded: true,
        error: '',
      });
  });
  it('should update oneGuitarCard comments by load comment', () => {
    const state = {guitars: [],
      isGuitarsDataLoaded: false,
      oneGuitarCard: guitar,
      isOneGuitarCardDataLoaded: true,
      error: '',
    };
    expect(guitarsProcessData.reducer(state, loadPostedComment(commentPost)))
      .toEqual({guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: guitarWithCommentPost,
        isOneGuitarCardDataLoaded: true,
        error: '',
      });
  });
  it('should update error by load response status', () => {
    const state = {
      guitars: [],
      isGuitarsDataLoaded: false,
      oneGuitarCard: null,
      isOneGuitarCardDataLoaded: false,
      error: '',
    };
    expect(guitarsProcessData.reducer(state, setError(fakeErrorStatus)))
      .toEqual({
        guitars: [],
        isGuitarsDataLoaded: false,
        oneGuitarCard: null,
        isOneGuitarCardDataLoaded: false,
        error: '404',
      });
  });
});
