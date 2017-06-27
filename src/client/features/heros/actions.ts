import request from 'axios';
import { returntypeof } from 'react-redux-typescript';
import { apiRootURL } from '../../config';
import { RootState } from '../../config/reducers';
import { Heros } from '../../models/';
import * as actions from './action-types';

export const actionCreators = {
    fetchHerosLoading: () => ({
        type: actions.FETCH_HEROS_LOADING as typeof actions.FETCH_HEROS_LOADING,
    }),
    fetchHerosNotLoading: () => ({
        type: actions.FETCH_HEROS_NOT_LOADING as typeof actions.FETCH_HEROS_NOT_LOADING,
    }),
    fetchHerosSuccess: (payload: Heros) => ({
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
            const response = await request.get(`${apiRootURL}/hero`);
            dispatch(actionCreators.fetchHerosSuccess(response.data));
        } catch (error) {
            dispatch(actionCreators.fetchHerosError(error));
        } finally {
            dispatch(actionCreators.fetchHerosNotLoading());
        }
    },
};

const actionTypes = {
    fetchHerosLoading: returntypeof(actionCreators.fetchHerosLoading),
    fetchHerosNotLoading: returntypeof(actionCreators.fetchHerosNotLoading),
    fetchHerosSuccess: returntypeof(actionCreators.fetchHerosSuccess),
    fetchHerosError: returntypeof(actionCreators.fetchHerosError),
};

export type Action = typeof actionTypes[keyof typeof actionTypes];
