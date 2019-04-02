export const ADD_DATA_INFO = 'ADD_FED';

export function addDataInfo(id, info) {
    return { type: ADD_DATA_INFO, id, info };
}