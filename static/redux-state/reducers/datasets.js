import {
    ADD_DATA_INFO
} from "../actions/datasets";

const INITIAL_STATE = {
    ["crd"] : {name: "DDI + CRD + PubMedDDI", loaded: false},
    ["ncrd"] : {name: "DDI + NCRD + PubMedDDI", loaded: false}
};

const datasets = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_DATA_INFO:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    ...action.info
                }
            };

        default:
            return state;
    }
}

export default datasets;