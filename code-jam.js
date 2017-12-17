const os = require("os");
const readline = require('readline');

exports.run = (task) => {
    const rl = readline.createInterface({
        input: process.stdin,
    });

    const inputLines = [];
    rl.on('line', (inputLine) => {
        inputLines.push(inputLine);
    });

    rl.on('close', () => {
        task(inputLines).map((outputLine) => {
            process.stdout.write(outputLine);
            process.stdout.write(os.EOL);
        });
    });
};