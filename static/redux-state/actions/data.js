import fetch from "cross-fetch";
import Global from '../singleton.js';

export const ADD_DATA_ELEM = 'ADD_DATA_ELEM';
export const RESET_DATA = 'RESET_DATA';

export function addDataElem(sets, size) {
    return { type: ADD_DATA_ELEM, sets, size };
}

export function resetData(sets, size) {
    return { type: RESET_DATA, sets, size };
}
/***********/

export function fetchCount(query) {
    //console.log("query:", query);
    return (dispatch) => {
        fetch(Global.endpoint + "?query=" + encodeURIComponent(query), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(
        (result) => {
            var outputs = result.results.bindings;

            for (var i = 0; i < outputs.length; i++) {
                var identifier = Object.keys(outputs[i])[0];
                var sets = identifier.split("_");
                var size = parseInt(outputs[i][identifier].value);
            }
            dispatch( addDataElem(sets, size) );
        },
        (error) => {
            console.log(error);
        });
    };
}