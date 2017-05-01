module.exports = data => {
    let items = []
    for (let i = 7; i < data.length; i += 3) {
        items.push({

            // Pointer to specific item from Questionnaire
            linkId: data[i],

            // definition		0..1	uri	ElementDefinition - details for the item

            // Name for group or question text
            text: data[i + 1],

            // Answer
            answer: [
                {
                    valueCoding: {
                        code: data[i + 2]
                    }
                }
            ]
        })
    }

    return {
        resourceType: "QuestionnaireResponse",
        id: data[0],
        questionnaire: {
            reference: data[1],
            display  : data[2]
        },
        status: data[3].toLowerCase(),
        subject: {
            reference: data[4],
            display  : data[5]
        },
        context: {
            reference: data[6]
        },
        item: items
    };
}
