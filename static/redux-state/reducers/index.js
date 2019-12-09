import { combineReducers } from "redux";

import data      from "./data";
import datasets  from "./datasets";
import general   from "./general";
import ui        from "./ui";

const ontarioApp = combineReducers({
    data,
    datasets,
    general,
    ui
});

export default ontarioApp;