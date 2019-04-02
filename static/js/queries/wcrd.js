
/*#################### DDI  ##############################################*/

const get_ddi = () => {
    return `SELECT distinct (SUM(?c1) as ?ddi)
    {
    {
        SELECT distinct COUNT(?d1)/2 as ?c1
        WHERE {
            ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d2.
        FILTER(
            EXISTS {?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d1.}
            )
        }
    }
    UNION
    {
        SELECT distinct COUNT(?d3) as ?c1
        WHERE {
            ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d4.
        FILTER(
            !EXISTS {?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d3.}
            )
        }
    }
    }
    `;
}

/*#################### PubMed  ###########################################*/

const get_pubMed = () => {
    return `SELECT  distinct (COUNT(?d1) as ?pubMed)
        WHERE {
            ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_pubMed> ?d2.
        }
    `;
}

/*#################### CRD  ################################################*/

const get_crd = () => {
    return `SELECT  distinct (COUNT(?d1) as ?crd)
        WHERE {
            ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d2.
        }
    `;
}

/*############ Intersection_DDI_CRD ###########################################*/

const get_ddi_crd = () => {
    return `SELECT distinct (SUM(?c1) as ?ddi_crd)
    {
    {
    SELECT distinct COUNT(?d1)/2 as ?c1
    WHERE {
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d2.
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d2.
    FILTER(
    EXISTS {?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d1.}
    )
    }
    }
    UNION
    {
    SELECT distinct COUNT(?d3) as ?c1
    WHERE {
    ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d4.
    ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d4.
    FILTER(
    !EXISTS {?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d3.}
    )
    }
    }
    UNION
    {
    SELECT distinct COUNT(?d1)/2 as ?c1
    WHERE {
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d2.
    ?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d1.
    FILTER(
    EXISTS {?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d1.}
    )
    }
    }
    UNION
    {
    SELECT distinct COUNT(?d3) as ?c1
    WHERE {
    ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d4.
    ?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d3.
    FILTER(
    !EXISTS {?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d3.}
    )
    }
    }
    }
    `;
}

/*############ Intersection_CRD_PubMedDDI #####################################*/

const get_crd_pubMed = () => {
    return `SELECT distinct (COUNT(?d1) as ?crd_pubMed)
    {
    {
    SELECT distinct ?d1 ?d2
    WHERE {
    ?interaction a <http://project-iasis.eu/vocab/EffectInteraction>.
    ?interaction <http://project-iasis.eu/vocab/provenance> <http://project-iasis.eu/SourceName/PubMed>.
    ?interaction <http://project-iasis.eu/vocab/isAffected> ?d1.
    ?interaction <http://project-iasis.eu/vocab/affects> ?d2.
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d2
    }
    }
    UNION
    {
    SELECT distinct ?d1 ?d2
    WHERE {
    ?interaction a <http://project-iasis.eu/vocab/EffectInteraction>.
    ?interaction <http://project-iasis.eu/vocab/provenance> <http://project-iasis.eu/SourceName/PubMed>.
    ?interaction <http://project-iasis.eu/vocab/isAffected> ?d1.
    ?interaction <http://project-iasis.eu/vocab/affects> ?d2.
    ?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d1
    }
    }
    }
    `;
}

/*############ Intersection_DDI_PubMedDDI #######################################*/

const get_ddi_pubMed = () => {
    return `SELECT distinct (SUM(?c1) as ?ddi_pubMed)
    {
    {
    SELECT distinct COUNT(?d1)/2 as ?c1
    WHERE {
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d2.
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_pubMed> ?d2.
    FILTER(
    EXISTS {?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d1.}
    )
    }
    }
    UNION
    {
    SELECT distinct COUNT(?d3) as ?c1
    WHERE {
    ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d4.
    ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_pubMed> ?d4.
    FILTER(
    !EXISTS {?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d3.}
    )
    }
    }
    UNION
    {
    SELECT distinct COUNT(?d1)/2 as ?c1
    WHERE {
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d2.
    ?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_pubMed> ?d1.
    FILTER(
    EXISTS {?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d1.}
    )
    }
    }
    UNION
    {
    SELECT distinct COUNT(?d3) as ?c1
    WHERE {
    ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d4.
    ?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_pubMed> ?d3.
    FILTER(
    !EXISTS {?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d3.}
    )
    }
    }
    }
    `;
}

/*############ Intersection_DDI_CRD_PubMedDDI ###############################*/

const get_ddi_crd_pubMed = () => {
    return `SELECT distinct (SUM(?c1) as ?ddi_crd_pubMed)
    {
    {
    SELECT distinct COUNT(?d1)/2 as ?c1
    WHERE {
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d2.
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_pubMed> ?d2.
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d2.
    FILTER(
    EXISTS {?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d1.}
    )
    }
    }
    UNION
    {
    SELECT distinct COUNT(?d3) as ?c1
    WHERE {
    ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d4.
    ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_pubMed> ?d4.
    ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d4.
    FILTER(
    !EXISTS {?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d3.}
    )
    }
    }
    UNION
    {
    SELECT distinct COUNT(?d1)/2 as ?c1
    WHERE {
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d2.
    ?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_pubMed> ?d1.
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d2.
    FILTER(
    EXISTS {?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d1.}
    )
    }
    }
    UNION
    {
    SELECT distinct COUNT(?d3) as ?c1
    WHERE {
    ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d4.
    ?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_pubMed> ?d3.
    ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d4.
    FILTER(
    !EXISTS {?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d3.}
    )
    }
    }
    UNION
    {
    SELECT distinct COUNT(?d1)/2 as ?c1
    WHERE {
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d2.
    ?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_pubMed> ?d1.
    ?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d1.
    FILTER(
    EXISTS {?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d1.}
    )
    }
    }
    UNION
    {
    SELECT distinct COUNT(?d3) as ?c1
    WHERE {
    ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d4.
    ?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_pubMed> ?d3.
    ?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d3.
    FILTER(
    !EXISTS {?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d3.}
    )
    }
    }
    UNION
    {
    SELECT distinct COUNT(?d1)/2 as ?c1
    WHERE {
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d2.
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_pubMed> ?d2.
    ?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d1.
    FILTER(
    EXISTS {?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d1.}
    )
    }
    }
    UNION
    {
    SELECT distinct COUNT(?d3) as ?c1
    WHERE {
    ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d4.
    ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_pubMed> ?d4.
    ?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d3.
    FILTER(
    !EXISTS {?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d3.}
    )
    }
    }
    }
    `;
}

export default {
    get_ddi: get_ddi,
    get_pubMed: get_pubMed,
    get_crd: get_crd,
    get_ddi_crd: get_ddi_crd,
    get_crd_pubMed: get_crd_pubMed,
    get_ddi_pubMed: get_ddi_pubMed,
    get_ddi_crd_pubMed: get_ddi_crd_pubMed
}