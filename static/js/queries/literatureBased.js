const get_lit_based_predictions = () => {
    return `SELECT distinct ?ddi
    WHERE {
        ?ddi <http://project-iasis.eu/vocab/predictionMethod> "Literature Predictions".
        {?ddi <http://project-iasis.eu/vocab/provenance> <http://project-iasis.eu/SourceName/DrugBank>.}
        UNION
        {?ddi <http://project-iasis.eu/vocab/provenance> <http://project-iasis.eu/SourceName/CRD>.}
        UNION
        {?ddi <http://project-iasis.eu/vocab/provenance> <http://project-iasis.eu/SourceName/NCRD>.}
        UNION
        {?ddi <http://project-iasis.eu/vocab/provenance> <http://project-iasis.eu/SourceName/WP4>.} 
}`;