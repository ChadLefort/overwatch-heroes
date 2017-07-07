import request, { AxiosResponse } from 'axios';
import { assign } from 'lodash/fp';
import { returntypeof } from 'react-redux-typescript';
import { ThunkAction } from 'redux-thunk';
import * as actions from '../../constants/heroTypes';
import * as serviceTypes from '../../constants/serviceTypes';
import { Hero } from '../../models/';
import { RootState } from '../../reducers/reducers';
import { actionCreators as herosActionCreators } from '../heros/herosActions';

export const actionCreators = {
    fetchHeroLoading: () => ({
        type: actions.FETCH_HERO_LOADING as typeof actions.FETCH_HERO_LOADING,
    }),
    fetchHeroNotLoading: () => ({
        type: actions.FETCH_HERO_NOT_LOADING as typeof actions.FETCH_HERO_NOT_LOADING,
    }),
    fetchHeroSuccess: (payload: Hero) => ({
        type: actions.FETCH_HERO_SUCCESS as typeof actions.FETCH_HERO_SUCCESS,
        payload,
    }),
    fetchHeroError: (error: Error) => ({
        type: actions.FETCH_HERO_ERROR as typeof actions.FETCH_HERO_ERROR,
        error,
    }),
    fetchHero: (id: string): ThunkAction<Promise<void>, RootState, null> =>
        async (dispatch) => {
            dispatch(actionCreators.fetchHeroLoading());

            try {
                const externalHeroResponse = await request.get(`${serviceTypes.EXTERNAL_API_ROOT_URL}/hero/${id}`);
                const internalHeroResponse = await request.get(`${serviceTypes.INTERNAL_API_ROOT_URL}/hero/${id}`);
                const hero: Hero = externalHeroResponse.data;
                const mergedHero: Hero = assign(hero, internalHeroResponse.data);

                dispatch(actionCreators.fetchHeroSuccess(mergedHero));
            } catch (error) {
                dispatch(actionCreators.fetchHeroError(error));
            } finally {
                dispatch(actionCreators.fetchHeroNotLoading());
            }
        },
    resetHero: () => ({
        type: actions.RESET_HERO as typeof actions.RESET_HERO,
    }),
    updateHeroSuccess: (payload: Hero) => ({
        type: actions.UPDATE_HERO_SUCCESS as typeof actions.UPDATE_HERO_SUCCESS,
        payload,
    }),
    updateHero: (hero: Hero): ThunkAction<Promise<AxiosResponse>, RootState, null> =>
        async (dispatch) => {
            const data = {
                id: hero.id,
                isFavorite: hero.isFavorite,
                personalNote: hero.personalNote,
            };
            const response = await request.post(`${serviceTypes.INTERNAL_API_ROOT_URL}/hero/${hero.id}`, data);

            dispatch(actionCreators.updateHeroSuccess(hero));
            dispatch(herosActionCreators.updateHeros(hero));

            return response;
        },
};

const actionTypes = {
    fetchHeroLoading: returntypeof(actionCreators.fetchHeroLoading),
    fetchHeroNotLoading: returntypeof(actionCreators.fetchHeroNotLoading),
    fetchHeroSuccess: returntypeof(actionCreators.fetchHeroSuccess),
    fetchHeroError: returntypeof(actionCreators.fetchHeroError),
    resetHero: returntypeof(actionCreators.resetHero),
    updateHeroSuccess: returntypeof(actionCreators.updateHeroSuccess),
};

export type Action = typeof actionTypes[keyof typeof actionTypes];
