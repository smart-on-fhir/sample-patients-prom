module.exports = data => {
    let out = {
        resourceType: "Encounter",
        id: data[0],
        status: (data[1] || "").toLowerCase(),
        class: {
            code: data[2]
        },
        type: [
            {
                coding: [
                    {
                        system : data[7],
                        code   : data[8],
                        display: data[9]
                    }
                ],
                text: data[9]
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
    };

    // reason ------------------------------------------------------------------
    if (data[10] && data[11] && data[12]) {
        out.reason = [
            {
                coding: [
                    {
                        system : data[10],
                        code   : data[11],
                        display: data[12]
                    }
                ],
                text: data[12]
            }
        ];
    }

    return out;
}