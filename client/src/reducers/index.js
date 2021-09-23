import { combineReducers } from "redux";
import postreducer from './postreducer';
import userreducer from "./userreducer";
export const rootreducer = combineReducers({ posts:postreducer , users:userreducer});