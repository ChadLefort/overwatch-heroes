import { Hero } from '../../models';
import * as actions from './action-types';
import { Action } from './actions';

export type State = {
  readonly heros: Array<Hero>,
  readonly fetching: boolean,
  readonly error: Error,
};

const initialState: State = {
    heros: [],
    fetching: false,
    error: null,
};

export function reducer(state = initialState, action: Action): State {
    switch (action.type) {
        case actions.FETCH_HEROS_LOADING: {
            return { ...state, fetching: true };
        }
        case actions.FETCH_HEROS_NOT_LOADING: {
            return { ...state, fetching: false };
        }
        case actions.FETCH_HEROS_ERROR: {
            return { ...state, error: action.error };
        }
        case actions.FETCH_HEROS_SUCCESS: {
            return { ...state, heros: action.payload.data };
        }
        default:
            return state;
    }
}