
import { strategyService } from '../service/strategy';
import { strategyConstants } from '../constants/strategy'
const getStrategyList = () => {

     return dispatch => {
         strategyService.getStrategyList().then(data => {
            dispatch({type :strategyConstants.GET_STRATEGY_LIST, data})
        }).catch(error => {
            dispatch({error : error});
        });
        
    } 
}
const getStrategyDetail = (id) => {
    return dispatch => {
        strategyService.getStrategyDetail(id).then(data => {
           dispatch({type :strategyConstants.GET_STRATEGY_DETAIL, data})
       }).catch(error => {
           dispatch({error : error});
       });
       
   } 
}
const updateStrategyDetail = function(detail){
    return dispatch => {
        dispatch({type :strategyConstants.UPDATE_STRATEGY_DETAIL, detail})
   } 
}
export const strategyAction =  {
    getStrategyList,
    getStrategyDetail,
    updateStrategyDetail
}