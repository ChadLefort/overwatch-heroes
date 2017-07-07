import { map } from 'lodash/fp';
import { Action } from '../../actions/heros/herosActions';
import * as actions from '../../constants/herosTypes';
import { Hero } from '../../models';

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
            return { ...state, heros: action.payload };
        }
        case actions.UPDATE_HEROS: {
            const heros = map((hero: Hero) => hero.id === action.payload.id ? action.payload : hero, state.heros) as Array<Hero>;
            return { ...state, heros };
        }
        default:
            return state;
    }
}
