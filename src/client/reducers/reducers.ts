import { combineReducers } from 'redux';
import { FormReducer as FormState, reducer as formReducer } from 'redux-form';
import { reducer as heroReducer, State as HeroState } from './hero/heroReducer';
import { reducer as herosReducer, State as HerosState } from './heros/herosReducer';

export type RootState = {
    heroReducer: HeroState,
    herosReducer: HerosState,
    formReducer: FormState
};

export const rootReducer = combineReducers<RootState>({
    heroReducer,
    herosReducer,
    form: formReducer,
});
