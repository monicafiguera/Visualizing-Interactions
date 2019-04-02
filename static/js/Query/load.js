var YASQE = require("../libs/yasqe.bundled.min");

function load() {
    var endpoint = 'http://localhost:11686/sparql';

    var yasqe = YASQE(document.getElementById("yasqe"), {
        sparql: {
                showQueryButton: true,
                endpoint: endpoint
        }
    });

    var yasr = YASR(document.getElementById("yasr"), {
        getUsedPrefixes: yasqe.getPrefixesFromQuery
    });

    yasqe.options.sparql.callbacks.beforeSend = function(jqXHR, setting){
        console.log('setting...:',setting, yasqe.getValue());
        setting.url = "http://localhost:11686/sparql?query=" + encodeURIComponent(yasqe.getValue());
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

export default {
    load: load
}