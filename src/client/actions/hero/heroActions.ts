import request, { AxiosResponse } from 'axios';
import * as _ from 'lodash';
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
    updateFavoriteHero: (id: string, isFavorite: boolean): ThunkAction<Promise<AxiosResponse>, RootState, null> =>
        async (dispatch) => {
            const convertedId = _.parseInt(id);
            const response = await request.post(`${serviceTypes.INTERNAL_API_ROOT_URL}/hero/${id}`, { id: convertedId, isFavorite });

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
