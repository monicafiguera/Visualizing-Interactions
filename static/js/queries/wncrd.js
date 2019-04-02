/*#################################################################################
  ################################### NCRD ########################################*/


/*#################### NCRD  #############################################*/

const get_ncrd = () => {
    return `SELECT  distinct (COUNT(?d1) as ?ncrd)
        WHERE {
            ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_noCYP> ?d2.
        }
    `;
}

/*############ Intersection_DDI_NCRD #######################################*/

const get_ddi_ncrd = () => {
    return `SELECT distinct (SUM(?c1) as ?ddi_ncrd)
    {
    {
    SELECT distinct COUNT(?d1)/2 as ?c1
    WHERE {
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d2.
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_noCYP> ?d2.
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
    ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_noCYP> ?d4.
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
    ?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_noCYP> ?d1.
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
    ?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_noCYP> ?d3.
    FILTER(
    !EXISTS {?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d3.}
    )
    }
    }
    }
    `;
}

/*############ Intersection_NCRD_PubMedDDI #################################*/

const get_ncrd_pubMed = () => {
    return `SELECT distinct (COUNT(?d1) as ?ncrd_pubMed)
    {
    {
    SELECT distinct ?d1 ?d2
    WHERE {
    ?interaction a <http://project-iasis.eu/vocab/EffectInteraction>.
    ?interaction <http://project-iasis.eu/vocab/provenance> <http://project-iasis.eu/SourceName/PubMed>.
    ?interaction <http://project-iasis.eu/vocab/isAffected> ?d1.
    ?interaction <http://project-iasis.eu/vocab/affects> ?d2.
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_noCYP> ?d2
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
    ?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_noCYP> ?d1
    }
    }
    }
    `;
}

/*############ Intersection_DDI_NCRD_PubMedDDI #######################################*/

const get_ddi_ncrd_pubMed = () => {
    return `SELECT distinct (SUM(?c1) as ?ddi_ncrd_pubMed)
    {
    {
    SELECT distinct COUNT(?d1)/2 as ?c1
    WHERE {
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d2.
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_pubMed> ?d2.
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_noCYP> ?d2.
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
    ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_noCYP> ?d4.
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
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_noCYP> ?d2.
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
    ?d3 <http://project-iasis.eu/vocab/drugDrugInteraction_noCYP> ?d4.
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
    ?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_noCYP> ?d1.
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
    ?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_noCYP> ?d3.
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
    ?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_noCYP> ?d1.
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
    ?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_noCYP> ?d3.
    FILTER(
    !EXISTS {?d4 <http://project-iasis.eu/vocab/drugDrugInteraction_drugBank> ?d3.}
    )
    }
    }
    }
    `;
}

export default {
    get_ncrd: get_ncrd,
    get_ddi_ncrd: get_ddi_ncrd,
    get_ncrd_pubMed: get_ncrd_pubMed,
    get_ddi_ncrd_pubMed: get_ddi_ncrd_pubMed
}