import request from 'axios';
import { assign, find, map } from 'lodash/fp';
import { returntypeof } from 'react-redux-typescript';
import { ThunkAction } from 'redux-thunk';
import * as actions from '../constants/heroesTypes';
import * as serviceTypes from '../constants/serviceTypes';
import { Hero, Heroes } from '../models/';
import { RootState } from '../reducers/reducers';

export const actionCreators = {
  fetchHeroesLoading: () => ({
    type: actions.FETCH_HEROS_LOADING as typeof actions.FETCH_HEROS_LOADING
  }),
  fetchHeroesNotLoading: () => ({
    type: actions.FETCH_HEROS_NOT_LOADING as typeof actions.FETCH_HEROS_NOT_LOADING
  }),
  fetchHeroesSuccess: (payload: Array<Hero>) => ({
    type: actions.FETCH_HEROS_SUCCESS as typeof actions.FETCH_HEROS_SUCCESS,
    payload
  }),
  fetchHeroesError: (error: Error) => ({
    type: actions.FETCH_HEROS_ERROR as typeof actions.FETCH_HEROS_ERROR,
    error
  }),
  fetchHeroes: (): ThunkAction<Promise<void>, RootState, null> => async dispatch => {
    dispatch(actionCreators.fetchHeroesLoading());

    try {
      const externalHeroResponse = await request.get(`${serviceTypes.EXTERNAL_API_ROOT_URL}/hero`);
      const internalHeroResponse = await request.get(`${serviceTypes.INTERNAL_API_ROOT_URL}/hero`);
      const mergedHeroes = map(
        (hero: Hero) => assign(hero, find({ id: hero.id }, internalHeroResponse.data)),
        externalHeroResponse.data.data
      );

      dispatch(actionCreators.fetchHeroesSuccess(mergedHeroes));
    } catch (error) {
      dispatch(actionCreators.fetchHeroesError(error));
    } finally {
      dispatch(actionCreators.fetchHeroesNotLoading());
    }
  },
  updateHeroes: (payload: Hero) => ({
    type: actions.UPDATE_HEROS as typeof actions.UPDATE_HEROS,
    payload
  })
};

const actionTypes = {
  fetchHeroesLoading: returntypeof(actionCreators.fetchHeroesLoading),
  fetchHeroesNotLoading: returntypeof(actionCreators.fetchHeroesNotLoading),
  fetchHeroesSuccess: returntypeof(actionCreators.fetchHeroesSuccess),
  fetchHeroesError: returntypeof(actionCreators.fetchHeroesError),
  updateHeroes: returntypeof(actionCreators.updateHeroes)
};

export type Action = typeof actionTypes[keyof typeof actionTypes];
