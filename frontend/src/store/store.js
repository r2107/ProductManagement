import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { products } from './reducers/productReducers';
import { user } from './reducers/authReducers';
import rootSaga from '../sagas/productsSaga';
import { createLogger } from 'redux-logger';

const rootReducer = combineReducers({
  user,
  products
});

const logger = createLogger();

export default function configureStore(){
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware,logger)
  );
  sagaMiddleware.run(rootSaga);
  return store;
}