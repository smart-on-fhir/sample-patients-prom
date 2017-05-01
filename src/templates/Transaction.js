module.exports = data => {
    let out = {
        resourceType: "Bundle",
        id: "bundle-request-insert-prom-patient-data-" + data.Patient.id,
        type: "transaction",
        entry: [
            {
                request: {
                    method     : "PUT",
                    url        : "Patient/" + data.Patient.id//,
                    // ifNoneExist: "_id=" + data.Patient.id
                },
                resource: data.Patient
            }
        ]
    };

    if (data.Encounter) {
        out.entry.push({
            request: {
                method: "PUT",
                url   : "Encounter/" + data.Encounter.id
            },
            resource: data.Encounter
        })
    }

    if (data.PreOpEncounter) {
        out.entry.push({
            request: {
                method: "PUT",
                url   : "Encounter/" + data.PreOpEncounter.id
            },
            resource: data.PreOpEncounter
        })
    }

    if (data.PostOpEncounter) {
        out.entry.push({
            request: {
                method: "PUT",
                url   : "Encounter/" + data.PostOpEncounter.id
            },
            resource: data.PostOpEncounter
        })
    }

    if (data.Procedure) {
        out.entry.push({
            request: {
                method: "PUT",
                url   : "Procedure/" + data.Procedure.id
            },
            resource: data.Procedure
        })
    }

    // Questionnaires ----------------------------------------------------------
    // let q1 = require("../../docs/QuestionnaireSMART-PROMs-QUE1.json")
    // out.entry.push({
    //     request: {
    //         method: "PUT",
    //         url   : "Questionnaire/" + q1.id
    //     },
    //     resource: q1
    // })

    // Questionnaire Responses -------------------------------------------------
    if (data.QuestionnaireResponseQ1PreOp) {
        out.entry.push({
            request: {
                method: "PUT",
                url   : "QuestionnaireResponse/" + data.QuestionnaireResponseQ1PreOp.id
            },
            resource: data.QuestionnaireResponseQ1PreOp
        })
    }

    if (data.QuestionnaireResponseQ2Postop) {
        out.entry.push({
            request: {
                method: "PUT",
                url   : "QuestionnaireResponse/" + data.QuestionnaireResponseQ2Postop.id
            },
            resource: data.QuestionnaireResponseQ2Postop
        })
    }

    if (data.QuestionnaireResponseEQ5D3LPreOp) {
        out.entry.push({
            request: {
                method: "PUT",
                url   : "QuestionnaireResponse/" + data.QuestionnaireResponseEQ5D3LPreOp.id
            },
            resource: data.QuestionnaireResponseEQ5D3LPreOp
        })
    }

    if (data.QuestionnaireResponseEQ5D3LPostOp) {
        out.entry.push({
            request: {
                method: "PUT",
                url   : "QuestionnaireResponse/" + data.QuestionnaireResponseEQ5D3LPostOp.id
            },
            resource: data.QuestionnaireResponseEQ5D3LPostOp
        })
    }

    if (data.QuestionnaireResponseOHSPreOp) {
        out.entry.push({
            request: {
                method: "PUT",
                url   : "QuestionnaireResponse/" + data.QuestionnaireResponseOHSPreOp.id
            },
            resource: data.QuestionnaireResponseOHSPreOp
        })
    }

    if (data.QuestionnaireResponseOHSPostOp) {
        out.entry.push({
            request: {
                method: "PUT",
                url   : "QuestionnaireResponse/" + data.QuestionnaireResponseOHSPostOp.id
            },
            resource: data.QuestionnaireResponseOHSPostOp
        })
    }

    return out;
};
