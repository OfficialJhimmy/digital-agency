
const intialState = {
    singleAds : []
}


const singleAdsReducer = ({state = intialState, action}) => {
        switch(action.type){
            case 'VIEW_ADS' :
            return{
                ...state,
                singleAds : action.payload
            }
            default: 
                return state
        }        
}

export default singleAdsReducer;
