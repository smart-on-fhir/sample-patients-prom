module.exports = data => {
    let out = {
        resourceType: "Encounter",
        id: data[0],
        text: {
            status: "generated",
            div: `<div xmlns="http://www.w3.org/1999/xhtml">${data[9]} - ${(data[1] || "unknown status").toLowerCase()}</div>`
        },
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