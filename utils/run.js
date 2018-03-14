const os = require("os");
const readline = require('readline');

module.exports = (handler) => {
    const rl = readline.createInterface({
        input: process.stdin,
    });

    const inputLines = [];
    rl.on('line', (inputLine) => {
        inputLines.push(inputLine);
    });

    rl.on('close', () => {
        handler(inputLines).map((outputLine) => {
            process.stdout.write(outputLine);
            process.stdout.write(os.EOL);
        });
    });
};