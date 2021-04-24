import { combineReducers } from "redux";
import manage from "./manage/manage";
import submit from "./submit";
import saveName from "./manage/saveName";

export default combineReducers({
  manage,
  submit,
  saveName,
});
