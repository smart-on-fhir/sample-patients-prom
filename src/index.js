"use strict";

const start = Date.now();

require("colors");

const Util = require("util");
const Pkg   = require("../package.json");
const Lib   = require("./lib.js");

console.log(`
================================================================================
                      ${Pkg.name} - v${Pkg.version}
================================================================================
`.bold);

Lib.parse().then(
    () => console.log(
        "\n" + " Done ".bold.greenBG + ` in ${Date.now() - start}ms`.bold + "\n"
    ),
    error => {
        console.log(" FAILED! ".bold.redBG);
        console.log(Util.inspect(error, { colors: true, depth: 16 }))
    }
);
