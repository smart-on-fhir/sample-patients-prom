/**
 * Procedure extends DomainResource
 * An action that is being or was performed on a patient
 * Reason not done is only permitted if notDone indicator is true
 * Elements defined in Ancestors: id, meta, implicitRules, language, text,
 * contained, extension, modifierExtension
 */
module.exports = data => ({

    id: data[0],
    resourceType: "Procedure",

    text: {
        status: "generated",
        div: `<div xmlns="http://www.w3.org/1999/xhtml">${data[4]} - ${data[1]}</div>`
    },

    // External Identifiers for this procedure
    // identifier: [],

    // Instantiates protocol or definition
    // Reference(PlanDefinition | ActivityDefinition | HealthcareService)
    // definition: [],

    // A request for this procedure
    // Reference(CarePlan | ProcedureRequest | ReferralRequest)	
    // basedOn: [],

    // Part of referenced event
    // Reference(Procedure | Observation | MedicationAdministration)
    // partOf: [],

    // code	preparation | in-progress | suspended | aborted | completed | entered-in-error | unknown
    // EventStatus (Required)
    status: data[1],

    // boolean	True if procedure was not performed as scheduled
    // notDone: false,

    // CodeableConcept	Reason procedure was not performed
    // Procedure Not Performed Reason (SNOMED-CT)
    // notDoneReason: 
    
    // CodeableConcept	Classification of the procedure
    // Procedure Category Codes (SNOMED CT)
    // category: 
    
    // CodeableConcept	Identification of the procedure
    // Procedure Codes (SNOMED CT)
    code: {
        coding: {
            system : data[2],
            code   : data[3],
            display: data[4]
        }
    },

    // Who the procedure was performed on
    // Reference(Patient | Group)
    subject: {
        reference: data[5],
        display  : data[6]
    },

    // Encounter or episode associated with the procedure
    // Reference(Encounter | EpisodeOfCare)
    context: {
        reference: data[8]
    },

    // Date/Period the procedure was performed
    // performed[x]	Σ	0..1
    performedDateTime: data[7]//,
        // .... performedPeriodX			Period	
    
    // The people who performed the procedure
    // BackboneElement
    // performer: [],

        // // The role the actor was in
        // // CodeableConcept
        // role: [],//	Σ	0..1		
        // Procedure Performer Role Codes (Example)
        // .... actor	Σ	1..1	Reference(Practitioner | Organization | Patient | RelatedPerson | Device)	The reference to the practitioner
        // .... onBehalfOf		0..1	Reference(Organization)	Organization the device or practitioner was acting for
    
    // Where the procedure happened
    // Reference(Location)	
    // location: Σ	0..1

    // Coded reason procedure performed
    // CodeableConcept Procedure Reason Codes
    // reasonCode:	Σ	0..*

    // Condition that is the reason the procedure performed
    // Reference(Condition | Observation)
    // reasonReference:[]	Σ	0..*
    
    // CodeableConcept	Target body sites
    // SNOMED CT Body Structures (Example)
    // bodySite: []//	Σ	0..*

    // CodeableConcept	The result of procedure
    // Procedure Outcome Codes (SNOMED CT) (Example)
    // outcome	Σ	0..1	
    
    // Any report resulting from the procedure
    // Reference(DiagnosticReport)	
    // report: []		0..*	Reference(DiagnosticReport)	
    
    // Complication following the procedure
    // CodeableConcept Condition/Problem/Diagnosis Codes (Example)
    // complication: [],		0..*		
    
    // A condition that is a result of the procedure
    // Reference(Condition)
    // complicationDetail: []		0..*	
    
    // Instructions for follow up
    // CodeableConcept Procedure Follow up Codes (SNOMED CT) (Example)
    // followUp: []		0..*
    
    // Annotation	Additional information about the procedure
    // note: [] 0..*	
    
    // BackboneElement	Device changed in procedure
    // focalDevice: []		0..*	
    
    // Kind of change to device
    // CodeableConcept	Procedure Device Action Codes (Preferred)
    // action: []		0..1	
    
    // Device that was changed
    // Reference(Device)
    // manipulated:		1..1	
    
    // Items used during procedure
    // Reference(Device | Medication | Substance)
    // usedReference: []		0..*	
    
    // Coded items used during the procedure
    // CodeableConcept FHIR Device Types (Example)
    // usedCode: []		0..*		
    
});