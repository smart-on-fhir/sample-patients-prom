module.exports = data => ({
    resourceType: "Encounter",
    id: data[0],
    status: (data[1] || "").toLowerCase(),
    class: {
        code: data[2]
    },
    type: [
        {
            "coding": [
                {
                    "system": "http://snomed.info/sct",
                    "code"  : "270427003"
                }
            ],
            "text": data[2].charAt(0).toUpperCase() + data[2].substr(1) +  " Encounter"
        }
    ],
    subject: {
        reference: data[3],
        display: data[4]
    },
    period: {
        start: data[5],
        end  : data[6]
    }
});