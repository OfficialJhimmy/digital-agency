import { combineReducers } from 'redux';
import mainReducer from './reducer/reducer';
import singleAdsReducer from './reducer/singleAdsReducer';

const rootReducer = combineReducers ({
    adsList : mainReducer,
    adsview : singleAdsReducer,
});

export default rootReducer;