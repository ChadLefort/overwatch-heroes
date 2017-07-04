import { Hero } from '../../../models/hero';
import * as actions from './action-types';
import { Action } from './actions';

export type State = {
  readonly hero: Hero,
  readonly fetching: boolean,
  readonly error: Error,
};

const initialState: State = {
    hero: new Hero(),
    fetching: false,
    error: null,
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
        case actions.UPDATE_FAVORITE_HERO_SUCCESS: {
            const hero = { ...state.hero, isFavorite: action.payload };
            return { ...state, hero };
        }
        default:
            return state;
    }
}
