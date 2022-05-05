import { createStore, applyMiddleware} from 'redux';
// import rootReducer from './rootReducer';
import ThunkMiddleware from 'redux-thunk';
import mainReducer from './reducer/reducer';
import { fetchAds } from './action/action';

const store = createStore(mainReducer, applyMiddleware(ThunkMiddleware));
store.subscribe(() => { console.log(store.getState())});
store.dispatch(fetchAds());

export default store;