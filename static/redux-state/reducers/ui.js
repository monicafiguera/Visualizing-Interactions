import {SET_ACTIVE_TAB} from "../actions/ui";

const activeSidebarTab = (state = 0, action = {}) => {
    switch (action.type) {
        case SET_ACTIVE_TAB:
            return action.index

        default:
            return state
    }
}

export default activeSidebarTab;