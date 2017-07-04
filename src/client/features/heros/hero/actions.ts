import request from 'axios';
import * as _ from 'lodash';
import { returntypeof } from 'react-redux-typescript';
import { externalApiRootURL, internalApiRootURL } from '../../../config';
import { RootState } from '../../../config/reducers';
import { Hero } from '../../../models/';
import { actionCreators as herosActionCreators } from '../actions';
import * as actions from './action-types';

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
    fetchHero: (id: string) => async (dispatch: Redux.Dispatch<RootState>) => {
        dispatch(actionCreators.fetchHeroLoading());

        try {
            const externalHeroResponse = await request.get(`${externalApiRootURL}/hero/${id}`);
            const internalHeroResponse = await request.get(`${internalApiRootURL}/heros/${id}`);
            const hero: Hero = externalHeroResponse.data;
            const mergedHero: Hero = _.assign(hero, internalHeroResponse.data);

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
    updateFavoriteHeroSuccess: (payload: boolean) => ({
        type: actions.UPDATE_FAVORITE_HERO_SUCCESS as typeof actions.UPDATE_FAVORITE_HERO_SUCCESS,
        payload,
    }),
    updateFavoriteHero: (id: string, isFavorite: boolean) => async (dispatch: Redux.Dispatch<RootState>) => {
        const convertedId = _.parseInt(id);
        const response = await request.post(`${internalApiRootURL}/heros/${id}`, { id: convertedId, isFavorite });

        dispatch(actionCreators.updateFavoriteHeroSuccess(isFavorite));
        dispatch(herosActionCreators.updateFavoriteHeros({ id: convertedId, isFavorite }));

        return response;
    },
};

const actionTypes = {
    fetchHeroLoading: returntypeof(actionCreators.fetchHeroLoading),
    fetchHeroNotLoading: returntypeof(actionCreators.fetchHeroNotLoading),
    fetchHeroSuccess: returntypeof(actionCreators.fetchHeroSuccess),
    fetchHeroError: returntypeof(actionCreators.fetchHeroError),
    resetHero: returntypeof(actionCreators.resetHero),
    updateFavoriteHeroSuccess: returntypeof(actionCreators.updateFavoriteHeroSuccess),
};

export type Action = typeof actionTypes[keyof typeof actionTypes];
