import { combineReducers } from "redux"
import { counter } from "./reducer/count"
import { auth } from "./reducer/auth"

const rootReducer = combineReducers({
  counter,
  auth,
})

export default rootReducer
