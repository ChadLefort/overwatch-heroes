import { combineReducers } from 'redux';
import { FormReducer as FormState, reducer as formReducer } from 'redux-form';
import { reducer as heroesReducer, State as HeroesState } from './heroesReducer';
import { reducer as heroReducer, State as HeroState } from './heroReducer';

export type RootState = {
  heroReducer: HeroState;
  heroesReducer: HeroesState;
  formReducer: FormState;
};

export const rootReducer = combineReducers<RootState>({
  heroReducer,
  heroesReducer,
  form: formReducer
});
