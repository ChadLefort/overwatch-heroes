import { combineReducers } from 'redux';
import { reducer as heroReducer, State as HeroState } from './hero/heroReducer';
import { reducer as herosReducer, State as HerosState } from './heros/herosReducer';

export type RootState = {
    heroReducer: HeroState
    herosReducer: HerosState
};

export const rootReducer = combineReducers<RootState>({
    heroReducer,
    herosReducer,
});
