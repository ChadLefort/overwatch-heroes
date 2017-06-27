import { combineReducers } from 'redux';
import { reducer as heroReducer, State as HeroState } from '../features/heros/hero/reducer';
import { reducer as herosReducer, State as HerosState } from '../features/heros/reducer';

export type RootState = {
    heroReducer: HeroState
    herosReducer: HerosState
};

export const rootReducer = combineReducers<RootState>({
    heroReducer,
    herosReducer,
});
