import { combineReducers } from 'redux'
import {strategyConstants} from '../constants/strategy'

let initialState = {}

const strategy = (state=initialState, action) => {
  switch (action.type) {
    case strategyConstants.GET_STRATEGY_LIST:
      return {
        ...state,
        list : action.data.data
      }
      case strategyConstants.GET_STRATEGY_DETAIL:
        return {
          ...state,
          detail : action.data.data[0]
        }
      case strategyConstants.UPDATE_STRATEGY_DETAIL :
        return {
          ...state,
          detail : action.detail
        }
    default:
      return state
  }
}

const strategyReducer = combineReducers({
  strategy
})

export default strategyReducer
