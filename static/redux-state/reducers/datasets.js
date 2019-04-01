import {
    ADD_FED,
    DELETE_FED,
    EDIT_FED
} from "../actions/datasets";

const INITIAL_STATE = {
    ["crd"] : {name: "DDI + CRD + PubMedDDI"},
    ["ncrd"] : {name: "DDI + NCRD + PubMedDDI"}
};

const datasets = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_FED:
            return {
                ...state,
                [action.uri]: {
                    ...state[action.uri],
                    ...action.info
                }
            };

        case DELETE_FED:
            return state.filter(elem =>
                elem.name !== action.name
            );

        case EDIT_FED:
            return state.map(elem =>
                elem.name === action.name
                    ? Object.assign({}, elem, { name: action.newName, desc: action.desc })
                    : elem
            );

        default:
            return state;
    }
}

export default datasets;