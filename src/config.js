module.exports = {
    serverBaseURI: "http://fhirtest.uhn.ca/baseDstu3",
    proxy: "http://proxy.tch.harvard.edu:3128",
    types : {
        Patient: {
            csvHeaders: 3,
            template  : require("./templates/Patient.js"),
            source    : "input_files/csv/Patient.csv",
            write     : true
        },
        Encounter: {
            csvHeaders: 2,
            template  : require("./templates/Encounter.js"),
            source    : "input_files/csv/Encounter.csv",
            write     : true
        },
        PreOpEncounter: {
            csvHeaders: 2,
            template  : require("./templates/Encounter.js"),
            source    : "input_files/csv/PreOpEncounter.csv",
            write     : true
        },
        PostOpEncounter: {
            csvHeaders: 2,
            template  : require("./templates/Encounter.js"),
            source    : "input_files/csv/PostOpEncounter.csv",
            write     : true
        },
        Procedure: {
            csvHeaders: 3,
            template  : require("./templates/Procedure.js"),
            source    : "input_files/csv/Procedure.csv",
            write     : true
        },
        QuestionnaireResponseQ1PreOp: {
            csvHeaders: 6,
            template  : require("./templates/QuestionnaireResponse.js"),
            source    : "input_files/csv/QuestionnaireResponse Q1 Pre-op.csv",
            write     : true
        },
        QuestionnaireResponseQ2Postop: {
            csvHeaders: 6,
            template  : require("./templates/QuestionnaireResponse.js"),
            source    : "input_files/csv/QuestionnaireResponse Q2 Postop.csv",
            write     : true
        },
        QuestionnaireResponseEQ5D3LPreOp: {
            csvHeaders: 6,
            template  : require("./templates/QuestionnaireResponse.js"),
            source    : "input_files/csv/QuestionnaireResponse EQ5D3L Pre-op.csv",
            write     : true
        },
        QuestionnaireResponseEQ5D3LPostOp: {
            csvHeaders: 6,
            template  : require("./templates/QuestionnaireResponse.js"),
            source    : "input_files/csv/QuestionnaireResponse EQ5D3L Post-op.csv",
            write     : true
        },
        QuestionnaireResponseOHSPreOp: {
            csvHeaders: 6,
            template  : require("./templates/QuestionnaireResponse.js"),
            source    : "input_files/csv/QuestionnaireResponse OHS PreOp.csv",
            write     : true
        },
        QuestionnaireResponseOHSPostOp: {
            csvHeaders: 6,
            template  : require("./templates/QuestionnaireResponse.js"),
            source    : "input_files/csv/QuestionnaireResponse OHS PostOp.csv",
            write     : true
        },
        QuestionnaireResponseOKSPreOp: {
            csvHeaders: 6,
            template  : require("./templates/QuestionnaireResponse.js"),
            source    : "input_files/csv/QR-OKS Pre-op.csv",
            write     : true
        },
        QuestionnaireResponseOKSPostOp: {
            csvHeaders: 6,
            template  : require("./templates/QuestionnaireResponse.js"),
            source    : "input_files/csv/QR-OKS Post-op.csv",
            write     : true
        },
        QRAVVQPreOp: {
            csvHeaders: 6,
            template  : require("./templates/QuestionnaireResponse.js"),
            source    : "input_files/csv/QR-AVVQ Pre-Op.csv",
            write     : true
        },
        QRAVVQPostOp: {
            csvHeaders: 6,
            template  : require("./templates/QuestionnaireResponse.js"),
            source    : "input_files/csv/QR-AVVQ Post-Op.csv",
            write     : true
        }
    }
};
