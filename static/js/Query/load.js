var YASQE = require("../libs/yasqe.bundled.min");
function load() {
    var yasqe = YASQE(document.getElementById("yasqe"), {
        sparql: {
                showQueryButton: true,
                endpoint: 'http://localhost:WEB_PORT/sparql'
        }
        });
        //yasqe.addPrefixes({"owl": "http://www.w3.org/2002/07/owl#" });
        var yasr = YASR(document.getElementById("yasr"), {
        getUsedPrefixes: yasqe.getPrefixesFromQuery
        });
        yasqe.options.sparql.callbacks.complete = yasr.setResponse;
}

export default {
    load: load
}