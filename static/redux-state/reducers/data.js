import {
    ADD_DATA_ELEM,
    RESET_DATA
} from "../actions/data";

const INITIAL_STATE = [];

const data = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_DATA_ELEM:
            return [
              ...state,
              { sets: action.sets,
                size: action.size
              }];

        case RESET_DATA:
            return [ ];

        default:
            return state;
    }
}

export default data;