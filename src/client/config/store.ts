import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer, RootState } from '../reducers/reducers';

const middleware = process.env.NODE_ENV !== 'production' ?
  [require('redux-immutable-state-invariant').default(), thunk] :
  [thunk];
const recoverState = (): RootState => ({} as RootState);

export default createStore(
    rootReducer,
    recoverState(),
    composeWithDevTools(applyMiddleware(...middleware))
);
