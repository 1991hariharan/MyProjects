import React from "react";
import ReactDOM from "react-dom";
import ViewStrategy from './components/ViewStrategy';
import ViewStrategyDetail from './components/ViewStrategyDetail'
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import { Provider } from "react-redux";
import {Switch} from 'react-router';
import strategyReducer from "./reducers/strategy";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import registerServiceWorker from "./registerServiceWorker";
import "./assets/css/style.css";

//let store = createStore(strategyReducer) // this is store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  strategyReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <Switch>
          <Route path="/ViewStrategy" component={ViewStrategy} />
          <Route path="/ViewStrategyDetail/:id" component={ViewStrategyDetail}/>
          <Route path="/" component={ViewStrategy} />
    </Switch>
  </BrowserRouter >
   
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
