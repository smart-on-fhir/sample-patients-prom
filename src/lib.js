"use strict";

const FS          = require("fs");
const Path        = require("path");
const CFG         = require("./config.js");
const trxTemplate = require("./templates/Transaction.js");
const EOL         = /\r\n|\n|\r/;
const CSV_LINE    = /[^\s,]/; // matches non-empty lines
const CSV_COMMENT = /^#/;
const BASE        = Path.join(__dirname, "..");

/**
 * This is somewhat similar to the debug module mut it writes directly to STDOUT
 * and does NOT append new line at the end which allows us to do funky stuff.
 * @param {String} msg The message to log
 * @param {String} group The logging group that this goes into
 * @returns {void}
 */
function debugLog(msg, group="*"/*, severity="debug"*/) {
    group = String(group).toLowerCase();
    let types = String(process.env.DEBUG || "").trim().toLowerCase().split(/\s*,\s*/);
    let all = types.indexOf("*") > -1;
    if (all || types.indexOf(group) > -1) {
        process.stdout.write(msg);
    }
}

/**
 * Promisified version of FS.writeFile.
 * @param {String|Buffer|number} file filename or file descriptor
 * @param {String|Buffer} data File contents
 * @param {Object|String} options The options accepted by FS.writeFile
 */
function writeFile(file, data, options={}) {
    return new Promise((resolve, reject) => {
        FS.writeFile(file, data, options, error => {
            if (error) {
                return reject(error);
            }
            return resolve(data);
        })
    })
}

/**
 * Promisified version of FS.readFile.
 * @param {String|Buffer|number} file filename or file descriptor
 * @param {String|Buffer} data File contents
 * @param {Object|String} options The options accepted by FS.writeFile
 */
function readFile(file, options={}) {
    return new Promise((resolve, reject) => {
        FS.readFile(file, options, (error, data) => {
            if (error) {
                return reject(error);
            }
            return resolve(data);
        })
    })
}

/**
 * Reads the file, splits it into lines and returns the lines array.
 * This function will also exclude any empty lines from the CSV file.
 * @param {String} csvFilePath The path to the CSV file. Can be absolute or
 *                             relative to CWD.
 * @param {number} skip How many lines to skip. Useful for skipping any header
 *                      lines. Defaults to 0.
 * @returns {String[]} An array of line strings
 */
async function getCSVLines(csvFilePath, skip=0) {
    return (await readFile(csvFilePath, "utf8")).split(EOL).slice(skip).filter(
        line => CSV_LINE.test(line) && !CSV_COMMENT.test(line)
    );
}

/**
 * Splits the line into cells using the provided separator (or by comma by
 * default) and returns the cells array. supports quoted strings and escape
 * sequences.
 * @param {String} line The line to parse
 * @param {String} separator The separator to use (defaults to ",")
 * @returns {String[]} The cells as array of strings
 */
function getCSVLineCells(line, separator=",") {
    let out        = [],
        idx        = 0,
        len        = line.length,
        char       = "",
        expect     = null,
        buffer     = "",
        escapeChar = "\\";

    while (idx < len) {
        char = line[idx++];
        switch (char) {

        // String
        case '"':

            // begin string
            if (!expect) {
                expect = char;
                break;
            }

            // Escaped delimiter - continue string
            if (expect === char && idx > 1 && line[idx-2] === escapeChar) {
                buffer += char;
                break;
            }

            // Close string
            expect = null;
            out.push(buffer);
            buffer = "";
            idx++
            break;

        // separator
        case separator:
            if (!expect) {
                out.push(buffer);
                buffer = "";
            }
            else {
                buffer += char;
            }
            break;

        default:
            buffer += char;
            break;
        }
    }

    if (buffer) {
        out.push(buffer);
        buffer = "";
    }

    return out.map(o => o.trim());
}

/**
 * Write all the resources of the given type as JSON in a dedicated folder
 * @param {Array} resources The array of resources (parsed CSV lines)
 * @param {String} type The resource type
 * @returns {void}
 */
function writeResources(resources, type) {
    let base = Path.join(BASE, `out/${type}/`)
    debugLog(
        `Writing ${resources.length} ${type} resources`.bold + ` to ${base} `,
        "test"
    );
    let task = Promise.resolve();
    resources.forEach(p => {
        task = task.then(() => {
            debugLog('.', "test");
            return writeFile(`${base}${p.id}.json`, JSON.stringify(p, null, 4))
            .then(() => new Promise(resolve => setTimeout(resolve, 13)));
        })
    });
    return task.then(
        () => new Promise(resolve => setTimeout(
            () => {
                debugLog(" OK\n".bold.green, "test")
                resolve(task)
            },
            13
        ))
    );
}

/**
 * Given an array of bundles of patient-related resources, compiles a
 * transaction for each patient and writes it to "out/Transaction/"
 * @param {Array} data objects that contains one key for each resource...
 * @returns {void}
 */
function writeTransactions(data) {
    let msg = `Writing ${data.length} transactions`.bold +
        ` to ${Path.join(BASE, "out/Transaction/")} ... `;

    debugLog(msg, "test")

    return Promise.all(data.map(set => {
        let trx = trxTemplate(set)
        return writeFile(
            Path.join(BASE, `out/Transaction/${set.Patient.id}.json`),
            JSON.stringify(trx, null, 4)
        ).then(() => trx)
    }))
    .then(
        x => {
            debugLog(" OK\n".bold.green, "test")
            return x
        },
        e => {
            debugLog(" Failed\n".bold.red, "test")
            return Promise.reject(e)
        }
    )
}

/**
 * Given a resource type (as string), uses the configuration for instructions
 * and builds and returns an array with all the resources of that type as JSON.
 * @param {String} type The type of resources to parse
 * @returns {Array}
 */
async function parseResourcesCsv(type) {
    let meta  = CFG.types[type];
    let source = Path.join(BASE, meta.source);
    return (await getCSVLines(source, meta.csvHeaders)).map(
        line => meta.template(getCSVLineCells(line))
    );
}

/**
 * Sequentially parse all the CSV files that are found in CFG.types
 */
async function parseAllCSVFiles() {
    debugLog("Parsing CSV files".bold + " ... ", "test");
    let out = {};
    for (let type in CFG.types) {
        out[type] = await parseResourcesCsv(type);
    }
    debugLog(" OK\n".bold.green, "test");
    return out
}

/**
 * The main function that does everything :)
 * @returns {Promise<Object>}
 */
function parse() {
    return parseAllCSVFiles()

    // Write parsed resources (CSV lines as JSON) to local JSON files
    .then(async resources => {
        for (let type in resources) {
            if (CFG.types[type] && CFG.types[type].write) {
                await writeResources(resources[type], type)
            }
        }
        return resources
    })

    // Link resources together in one bundle for each patient (using the
    // subject.reference elements of anything resource other than Patient)
    .then(structure => {
        debugLog(`Linking resources into patient bundles:\n`.bold, "compile")
        return structure.Patient.map(patient => {
            let out = { Patient: patient }
            let num = 0
            for (let type in structure) {
                if (type == "Patient") continue;
                let ref = structure[type].find(
                    o => o.subject.reference == `Patient/${patient.id}`
                )
                if (ref) {
                    num += 1
                    out[type] = ref
                }
            }
            debugLog(` • ${num} related resources found for patient #${patient.id}\n`, "compile")
            return out;
        })
    })
    .then(structure => {
        return Promise.resolve()
            .then(() => writeTransactions(structure))
            .then(() => structure)
    })
}

module.exports = {
    writeFile,
    readFile,
    getCSVLines,
    getCSVLineCells,
    writeResources,
    writeTransactions,
    parseResourcesCsv,
    parse
};
