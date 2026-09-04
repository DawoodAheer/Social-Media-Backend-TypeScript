"use strict";
const fs = require('fs');
function logger(message, data) {
    const logMessage = `${new Date().toISOString()}-${message}\n`;
    fs.appendFileSync("logs/app.log", logMessage);
}
;
module.exports = logger;
