import {SERVICE_CONNECTOR} from '../common/http/httpService';

const getStrategyList = function(){
    return SERVICE_CONNECTOR.get('/strategies')
}
const getStrategyDetail = function(Id){
    return SERVICE_CONNECTOR.get('/constituents?strategy_id='+Id)
}
export const strategyService =  {
    getStrategyList,
    getStrategyDetail
}