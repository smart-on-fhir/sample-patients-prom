const Lib = require("../src/lib.js");
const FS = require("fs");
const child_process = require("child_process");
const patientCsv = __dirname + "/../input_files/csv/patient.csv";
const encounterCsv = __dirname + "/../input_files/csv/Encounter.csv";


exports.writeFile = {
    "typical use"(test) {
        let path  = "test.txt";
        let value = "This is a test";
        Lib.writeFile(path, value, "utf8").then(
            () => {
                test.doesNotThrow(() => FS.accessSync(path, FS.constants.F_OK));
                test.equal(FS.readFileSync(path, "utf8"), value);
                FS.unlinkSync(path);
                test.done();
            },
            error => {
                test.done(error);
            }
        )
    },
    "error cases"(test) {
        Lib.writeFile("/root/a/a/a/a/a/x", "whatever", "utf8").then(
            () => test.done("Had to fail"),
            () => test.done()
        )
    }
};

exports.readFile = {
    "typical use"(test) {
        let path  = "test.txt";
        let value = "This is a test";
        FS.writeFileSync(path, value, "utf8");
        Lib.readFile(path, "utf8").then(
            () => {
                test.equal(FS.readFileSync(path, "utf8"), value);
                FS.unlinkSync(path);
                test.done();
            },
            error => {
                test.done(error);
            }
        )
    },
    "error cases"(test) {
        Lib.readFile("/root/a/a/a/a/a/x", "utf8").then(
            () => test.done("Had to fail"),
            () => test.done()
        )
    }
};

exports.getCSVLines = {
    async "returns the proper number of lines"(test) {
        let patientLines = (await Lib.getCSVLines(patientCsv)).length
        test.equal(
            patientLines,
            28,
            `should return 25 patient lines and 3 headers but got ${patientLines} lines`
        );

        let encounterLines =(await Lib.getCSVLines(encounterCsv)).length
        test.equal(
            encounterLines,
            27,
            `should return 25 patient lines and 2 headers but got ${encounterLines} lines`
        );

        test.ok(
            await Lib.getCSVLines(patientCsv, 3),
            "should be able to exclude the 3 headers"
        );
        test.done();
    }
};

exports.getCSVLineCells = {
    async "typical usage"(test) {
        let lines = await Lib.getCSVLines(patientCsv, 3);
        let first = Lib.getCSVLineCells(lines[0])
        test.equal(first[0], "SMART-PROMs-1");
        test.done();
    }
};

exports.writeResources = {
    setUp(cb) {
        child_process.execSync(`rm -f out/test_output/*.*`);
        cb();
    },
    tearDown(cb) {
        child_process.execSync(`rm -f out/test_output/*.*`);
        cb();
    },
    writeResources(test) {
        Lib.writeResources([{ id: "test1" }], "test_output")
        .then(() => {
            test.doesNotThrow(() => FS.accessSync(
                "out/test_output/test1.json",
                FS.constants.F_OK
            ));
            test.equal(FS.readFileSync(
                "out/test_output/test1.json",
                "utf8"
            ), JSON.stringify({ id: "test1" }, null, 4));
            test.done();
        })
        .catch(test.done)
    }
};

exports.writeTransactions = (patientID => ({
    setUp(cb) {
        child_process.execSync(`rm -f out/Transaction/${patientID}.json`)
        cb();
    },
    tearDown(cb) {
        child_process.execSync(`rm -f out/Transaction/${patientID}.json`)
        cb();
    },
    basic(test) {
        Lib.writeTransactions([{
            Patient: { id: patientID }
        }]).then(
            () => {
                test.doesNotThrow(() => FS.accessSync(
                    `out/Transaction/${patientID}.json`,
                    FS.constants.F_OK
                ));
                test.equal(FS.readFileSync(
                    `out/Transaction/${patientID}.json`,
                    "utf8"
                ), JSON.stringify({
                    "resourceType": "Bundle",
                    "id": `bundle-request-insert-prom-patient-data-${patientID}`,
                    "type": "transaction",
                    "entry": [
                        {
                            "request": {
                                "method": "PUT",
                                "url": `Patient/${patientID}`
                            },
                            "resource": {
                                "id": patientID
                            }
                        }
                    ]
                }, null, 4));
                test.done()
            }
        )
        .catch(test.done)
    }
}))("testPatient1");
