const fs =require('fs');

function logger(message: string, data?: string | number)  {
    const logMessage = `${new Date().toISOString()}-${message}\n`;
    fs.appendFileSync("logs/app.log", logMessage);
};
module.exports=logger;