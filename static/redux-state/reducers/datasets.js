import {
    ADD_DATA_INFO
} from "../actions/datasets";

const INITIAL_STATE = {
    ["crd"] : {name: "DDI + CRD + PubMedDDI", loaded: false},
    ["ncrd"] : {name: "DDI + NCRD + PubMedDDI", loaded: false},

    ["blm"]: {name: "Literature Based Predictions + semEP + BLM", loaded: false},
    ["laprls"]: {name: "Literature Based Predictions + semEP + LapRLS", loaded: false},
    ["gip"]: {name: "Literature Based Predictions + semEP + GIP", loaded: false},
    ["kbmf2k"]: {name: "Literature Based Predictions + semEP + KBMF2K", loaded: false}
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