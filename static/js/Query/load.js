var YASQE = require("../libs/yasqe.bundled.min");
import Global from '../../redux-state/singleton.js';

var endpoint = Global.endpoint;
var yasqe = null;

function draw() {
    return YASQE(document.getElementById("yasqe"), {
        sparql: {
                showQueryButton: true,
                endpoint: endpoint
        }
    });
}

function load() {
    yasqe = draw();

    var yasr = YASR(document.getElementById("yasr"), {
        getUsedPrefixes: yasqe.getPrefixesFromQuery
    });

    yasqe.options.sparql.callbacks.beforeSend = function(jqXHR, setting){
        console.log('setting...:',setting, yasqe.getValue());
        setting.url = endpoint + "?query=" + encodeURIComponent(yasqe.getValue());
        setting.crossDomain = true;
        setting.data ={"query": yasqe.getValue()};
    };

    /*yasqe.options.sparql.callbacks.complete = function(jqXHR, response) {
        //console.log("response", jqXHR, response);
        console.log(jqXHR.responseJSON.results.bindings);
        return yasr.setResponse;
    };*/

    yasqe.options.sparql.callbacks.complete = yasr.setResponse;
}

function setSampleQueryValue(query) {
    yasqe.setValue(query);
}

export default {
    load: load,
    setSampleQueryValue: setSampleQueryValue
}