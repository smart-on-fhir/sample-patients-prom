/*
Id,Identifier,,,,,Active,name {HumanName},,Telecom {ContactPoint},,Telecom {ContactPoint},,,,Address,,,
,Type,,,System,value,,Family Name,Given Name,system,value,system,value,gender,birthDate,line,city,state,postalCode
,system,code,Display,,,,,,,,,,,,,,,
*/

module.exports = (data, options = {}) => ({
    "resourceType": "Patient",
    "id": data[0],
    "text": {
        "status": "generated",
        "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">" +
            data[8] + " " + data[7] + "</div>"
    },
    "identifier": [
        {
            "use": "official",
            "type": {
                "coding": [
                    {
                        "system" : data[1],
                        "code"   : data[2],
                        "display": data[3]
                    }
                ],
                "text": data[3]
            },
            "system": data[4],
            "value" : data[0],
            // period ?
            // assigner ?
        }
    ],
    "active": data[6] == "Yes",
    "name": [
        {
            "use": "official",
            "family": options.STU == 2 ? [data[7]] : data[7],
            "given": [
                data[8]
            ]
        }
    ],
    "telecom": [
        {
            "system": data[9],
            "value": data[10]
        },
        {
            "system": data[11],
            "value": data[12]
        }
    ],
    "gender": data[13],
    "birthDate": data[14],
    "address": [
        {
            "line": [
                data[15]
            ],
            "city": data[16],
            "state": data[17],
            "postalCode": data[18]
        }
    ]
});
