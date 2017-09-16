import { map } from 'lodash/fp';
import { Action } from '../actions/heroesActions';
import * as actions from '../constants/heroesTypes';
import { Hero } from '../models';

export type State = {
  readonly heroes: Array<Hero>;
  readonly fetching: boolean;
  readonly error: Error;
};

const initialState: State = {
  heroes: [],
  fetching: false,
  error: null
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
      return { ...state, heroes: action.payload };
    }
    case actions.UPDATE_HEROS: {
      const heroes = map((hero: Hero) => (hero.id === action.payload.id ? action.payload : hero), state.heroes) as Array<Hero>;
      return { ...state, heroes };
    }
    default:
      return state;
  }
}
