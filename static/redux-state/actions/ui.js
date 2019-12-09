export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";

export function changeActiveSidebarTab(index) {
    return { type: SET_ACTIVE_TAB, index};
}
