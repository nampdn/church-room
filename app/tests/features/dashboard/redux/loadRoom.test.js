import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  DASHBOARD_LOAD_ROOM_BEGIN,
  DASHBOARD_LOAD_ROOM_SUCCESS,
  DASHBOARD_LOAD_ROOM_FAILURE,
  DASHBOARD_LOAD_ROOM_DISMISS_ERROR,
} from 'src/features/dashboard/redux/constants';

import {
  loadRoom,
  dismissLoadRoomError,
  reducer,
} from 'src/features/dashboard/redux/loadRoom';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('dashboard/redux/loadRoom', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadRoom succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadRoom())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', DASHBOARD_LOAD_ROOM_BEGIN);
        expect(actions[1]).to.have.property('type', DASHBOARD_LOAD_ROOM_SUCCESS);
      });
  });

  it('dispatches failure action when loadRoom fails', () => {
    const store = mockStore({});

    return store.dispatch(loadRoom({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', DASHBOARD_LOAD_ROOM_BEGIN);
        expect(actions[1]).to.have.property('type', DASHBOARD_LOAD_ROOM_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissLoadRoomError', () => {
    const expectedAction = {
      type: DASHBOARD_LOAD_ROOM_DISMISS_ERROR,
    };
    expect(dismissLoadRoomError()).to.deep.equal(expectedAction);
  });

  it('handles action type DASHBOARD_LOAD_ROOM_BEGIN correctly', () => {
    const prevState = { loadRoomPending: false };
    const state = reducer(
      prevState,
      { type: DASHBOARD_LOAD_ROOM_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadRoomPending).to.be.true;
  });

  it('handles action type DASHBOARD_LOAD_ROOM_SUCCESS correctly', () => {
    const prevState = { loadRoomPending: true };
    const state = reducer(
      prevState,
      { type: DASHBOARD_LOAD_ROOM_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadRoomPending).to.be.false;
  });

  it('handles action type DASHBOARD_LOAD_ROOM_FAILURE correctly', () => {
    const prevState = { loadRoomPending: true };
    const state = reducer(
      prevState,
      { type: DASHBOARD_LOAD_ROOM_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadRoomPending).to.be.false;
    expect(state.loadRoomError).to.exist;
  });

  it('handles action type DASHBOARD_LOAD_ROOM_DISMISS_ERROR correctly', () => {
    const prevState = { loadRoomError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: DASHBOARD_LOAD_ROOM_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loadRoomError).to.be.null;
  });
});
