import request from 'axios';
import * as _ from 'lodash';
import { returntypeof } from 'react-redux-typescript';
import { externalApiRootURL, internalApiRootURL } from '../../config';
import { RootState } from '../../config/reducers';
import { Hero, Heros } from '../../models/';
import * as actions from './action-types';

export const actionCreators = {
    fetchHerosLoading: () => ({
        type: actions.FETCH_HEROS_LOADING as typeof actions.FETCH_HEROS_LOADING,
    }),
    fetchHerosNotLoading: () => ({
        type: actions.FETCH_HEROS_NOT_LOADING as typeof actions.FETCH_HEROS_NOT_LOADING,
    }),
    fetchHerosSuccess: (payload: Array<Hero>) => ({
        type: actions.FETCH_HEROS_SUCCESS as typeof actions.FETCH_HEROS_SUCCESS,
        payload,
    }),
    fetchHerosError: (error: Error) => ({
        type: actions.FETCH_HEROS_ERROR as typeof actions.FETCH_HEROS_ERROR,
        error,
    }),
    fetchHeros: () => async (dispatch: Redux.Dispatch<RootState>) => {
        dispatch(actionCreators.fetchHerosLoading());

        try {
            const externalHeroResponse = await request.get(`${externalApiRootURL}/hero`);
            const internalHeroResponse = await request.get(`${internalApiRootURL}/heros`);
            const mergedHeros = _.map(externalHeroResponse.data.data, (hero: Hero) => {
                return _.assign(hero, _.find(internalHeroResponse.data, { id: hero.id }));
            });

            dispatch(actionCreators.fetchHerosSuccess(mergedHeros));
        } catch (error) {
            dispatch(actionCreators.fetchHerosError(error));
        } finally {
            dispatch(actionCreators.fetchHerosNotLoading());
        }
    },
    updateFavoriteHeros: (payload: {id: number, isFavorite: boolean}) => ({
        type: actions.UPDATE_FAVORITE_HEROS as typeof actions.UPDATE_FAVORITE_HEROS,
        payload,
    }),
};

const actionTypes = {
    fetchHerosLoading: returntypeof(actionCreators.fetchHerosLoading),
    fetchHerosNotLoading: returntypeof(actionCreators.fetchHerosNotLoading),
    fetchHerosSuccess: returntypeof(actionCreators.fetchHerosSuccess),
    fetchHerosError: returntypeof(actionCreators.fetchHerosError),
    updateFavoriteHeros: returntypeof(actionCreators.updateFavoriteHeros),
};

export type Action = typeof actionTypes[keyof typeof actionTypes];
