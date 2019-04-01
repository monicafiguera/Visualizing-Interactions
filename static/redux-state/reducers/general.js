import {
    SET_DATASET
} from "../actions/general";

const INITIAL_STATE = {
    currentDataset: ''
};

const general = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_DATASET:
            return {
                ...state,
                ["currentDataset"]: action.name
            };

        default:
            return state;
    }
}

export default general;