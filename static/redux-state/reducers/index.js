import { combineReducers } from "redux";


import datasets  from "./datasets";
import general   from "./general";
import ui        from "./ui";

const ontarioApp = combineReducers({
    datasets,
    general,
    ui
});

export default ontarioApp;