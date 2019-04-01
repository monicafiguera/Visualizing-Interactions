export const SET_DATASET = "SET_DATASET";

export function setCurrentDataset(name) {
    return { type: SET_DATASET, name};
}