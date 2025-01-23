const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');

const fileStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Enter the text to write to the file');

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    console.log('end of writing to file');
    rl.close();
    return;
  }

  fileStream.write(input + '\n', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(
        'The text has been successfully written. You can continue typing.',
      );
    }
  });
});

rl.on('SIGINT', () => {
  console.log('\nend of writing to file');
  rl.close();
});

rl.on('close', () => {
  fileStream.end();
});
