
let defaultState = {
    loading : false,
    ads : [],
    error : ""
}
 const mainReducer = (state=defaultState, action) =>{
     switch(action.type){
         case 'FETCH_ADS_REQUEST' : {
             return{
                 ...state,
                 loading : true
             }
         }
         case 'FETCH_ADS_SUCCESS' : {
             return{
                loading : false,
                ads : action.payload,
                error : ''
             }
         }
         case 'FETCH_ADS_FAILURE' : {
             return{
                 laoding : false,
                 ads : [],
                 error : action.payload
             }
         }
         default:
            return state
     }
 }
 export default mainReducer;