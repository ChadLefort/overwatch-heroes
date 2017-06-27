import request from 'axios';
import { returntypeof } from 'react-redux-typescript';
import { apiRootURL } from '../../../config';
import { RootState } from '../../../config/reducers';
import { Hero } from '../../../models/';
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
    fetchHero: (id: number) => async (dispatch: Redux.Dispatch<RootState>) => {
        dispatch(actionCreators.fetchHeroLoading());

        try {
            const response = await request.get(`${apiRootURL}/hero/${id}`);
            dispatch(actionCreators.fetchHeroSuccess(response.data));
        } catch (error) {
            dispatch(actionCreators.fetchHeroError(error));
        } finally {
            dispatch(actionCreators.fetchHeroNotLoading());
        }
    },
    resetHero: () => ({
        type: actions.RESET_HERO as typeof actions.RESET_HERO,
    }),
};

const actionTypes = {
    fetchHeroLoading: returntypeof(actionCreators.fetchHeroLoading),
    fetchHeroNotLoading: returntypeof(actionCreators.fetchHeroNotLoading),
    fetchHeroSuccess: returntypeof(actionCreators.fetchHeroSuccess),
    fetchHeroError: returntypeof(actionCreators.fetchHeroError),
    resetHero: returntypeof(actionCreators.resetHero),
};

export type Action = typeof actionTypes[keyof typeof actionTypes];
