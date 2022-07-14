import {configureMockStore} from '@jedmao/redux-mock-store';
import { Action} from 'redux';
import { State } from '../types/state';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import { fetchGuitars, fetchOneGuitarCard, addNewComment, fetchCoupon } from './api-action';
import { makeFakeGuitar } from '../components/utils/test-mocks';
import { APIRoute } from '../const';
import { setDiscount } from './basket-process-data/basket-process-data';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  jest.mock('./api/api', () => mockAPI);

  const fakeStore = configureMockStore<
        State,
        Action,
        ThunkDispatch<State, typeof api, Action>
        >(middlewares);

  it('should dispatch guitars when server return 200', async () => {
    const mockStore = fakeStore();

    jest.mock('./index', () => mockStore);

    const mockGuitars = [makeFakeGuitar(), makeFakeGuitar()];

    const expectedActions = [
      {
        type: fetchGuitars.pending.type,
      },
      {
        type: fetchGuitars.fulfilled.type,
      },
    ];

    mockAPI.onGet('/guitars?_embed=comments&_start=0&_limit=9').reply(200, mockGuitars);

    expect(mockStore.getActions()).toEqual([]);

    await mockStore.dispatch(fetchGuitars(['1', 2, 2, '', '', '']));

    const actions = mockStore.getActions().map((action) => ({
      type: action.type,
    }),
    );

    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch guitar when server return 200', async () => {
    const mockStore = fakeStore();

    jest.mock('./index', () => mockStore);

    const mockGuitar = makeFakeGuitar();

    const expectedActions = [
      {
        type: fetchOneGuitarCard.pending.type,
      },
      {
        type: fetchOneGuitarCard.fulfilled.type,
      },
    ];

    mockAPI.onGet('/guitars/1?_embed=comments').reply(200, mockGuitar);

    await mockStore.dispatch(fetchOneGuitarCard('1'));

    const actions = mockStore.getActions().map((action) => ({
      type: action.type,
    }),
    );

    expect(actions).toEqual(expectedActions);

  });


  it('should dispatch posted comment when server return 200', async () => {

    const fakeNewComment = {comment: {
      guitarId: 1,
      userName: 'Fake',
      advantage: 'Fake',
      disadvantage: 'Fake',
      comment: 'Fake',
      rating: 1,
    }, setIsSaving: () => null , setIsSuccessReviewModalOpened: () => null, setIsFormModalOpened : () => null };

    const mockStore = fakeStore();

    jest.mock('./index', () => mockStore);

    const mockGuitar = makeFakeGuitar();

    const expectedActions = [
      {
        type: addNewComment.pending.type,
      },
      {
        type: addNewComment.fulfilled.type,
      },
    ];

    mockAPI.onGet(APIRoute.Comments).reply(200, mockGuitar);

    await mockStore.dispatch(addNewComment(fakeNewComment));

    const actions = mockStore.getActions().map((action) => ({
      type: action.type,
    }),
    );
    expect(actions).toEqual(expectedActions);

  });

  it('should dispatch setDiscount when POST /coupons', async () => {
    const couponRespone = 15;
    const coupon = 'light-333';
    mockAPI.onPost(APIRoute.Coupons).reply(200, couponRespone);

    const mockStore = fakeStore();
    await mockStore.dispatch(fetchCoupon([coupon]));

    const actions = mockStore.getActions().map(({ type }) => type);

    expect(actions).toContain(`${setDiscount.toString()}/fulfilled`);
  });

});
