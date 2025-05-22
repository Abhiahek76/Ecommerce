import { combineReducers } from "@reduxjs/toolkit";
//import cartitemReducer from "../findCard/Action";

import authReducer from "../State/Action";
import froget from "../State/forgetpassword";
const rootReducer = combineReducers({
  auth: authReducer,
  forgotPassword: froget,
});

export default rootReducer;
