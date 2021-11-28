import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import appReducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app']
};

const persistedReducer = persistCombineReducers(persistConfig, {
  ...appReducers,
});

const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
const persistor = persistStore(store);

export { store, persistor };
