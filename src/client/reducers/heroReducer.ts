import { Action } from '../actions/heroActions';
import * as actions from '../constants/heroTypes';
import { Hero } from '../models/hero';

export type State = {
  readonly hero: Hero;
  readonly fetching: boolean;
  readonly error: Error;
};

const initialState: State = {
  hero: new Hero(),
  fetching: false,
  error: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case actions.FETCH_HERO_LOADING: {
      return { ...state, fetching: true };
    }
    case actions.FETCH_HERO_NOT_LOADING: {
      return { ...state, fetching: false };
    }
    case actions.FETCH_HERO_ERROR: {
      return { ...state, error: action.error };
    }
    case actions.FETCH_HERO_SUCCESS: {
      return { ...state, hero: action.payload };
    }
    case actions.RESET_HERO: {
      return { ...state, hero: new Hero() };
    }
    case actions.UPDATE_HERO_SUCCESS: {
      return { ...state, hero: action.payload };
    }
    default:
      return state;
  }
}
