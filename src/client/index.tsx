import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import 'semantic-ui-css/semantic.min.css';
import { actionCreators } from './actions/heroesActions';
import routes from './config/routes';
import store from './config/store';

declare const module: { hot: any };
const rootEl = document.getElementById('content');

store.dispatch(actionCreators.fetchHeroes());

const App = () => {
  return (
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  );
};

if (process.env.NODE_ENV === 'development') {
  const { AppContainer } = require('react-hot-loader');

  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    rootEl
  );

  if (module.hot) {
    module.hot.accept(App, () => {
      const NextApp = App;
      ReactDOM.render(
        <AppContainer>
          <NextApp />
        </AppContainer>,
        rootEl
      );
    });
  }
} else {
  ReactDOM.render(<App />, rootEl);
}
