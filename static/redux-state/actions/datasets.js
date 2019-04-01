import fetch from "cross-fetch";

export const ADD_FED = 'ADD_FED';
export const DELETE_FED = 'DELETE_FED';
export const EDIT_FED = 'EDIT_FED';

export function addFed(uri, info) {
    return { type: ADD_FED, uri, info };
}

export function deleteFed(name) {
    return { type: DELETE_FED, name };
}

export function editFed(name, newName, desc) {
    return { type: EDIT_FED, name, newName, desc };
}

/***********/


export function fetchFeds(url) {
    return (dispatch) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(
        (result) => {
            for (var i = 0; i < result.length; i++) {
                var uri = result[i];
                var fed = result[i];
                var fedName = fed.substr(fed.lastIndexOf('/') + 1);
                var desc = '';
                dispatch( addFed(uri, {uri: uri, name: fedName, desc: desc} ));
            }
        },
        (error) => {
            console.log(error);
        });
    };
}

/*
*
* How to make an AJAX call using react:
* from https://reactjs.org/docs/faq-ajax.html
*
* */
export function createFedRequest(name, desc) {
    return (dispatch) => {
        fetch('/api/createfederation?name=' + name + '&desc=' + desc, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                desc: desc
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    var uri = result;
                    dispatch( addFed(uri, {uri: uri, name: name, desc: desc} ));
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    return error;
                })
    }
}