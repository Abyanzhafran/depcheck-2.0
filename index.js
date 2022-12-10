const fs = require('fs');
const path = require('path')

function readFilesSync(dir) {
  const files = [];

  fs.readdirSync(dir).forEach(filename => {
    const name = path.parse(filename).name;
    const ext = path.parse(filename).ext;
    const filepath = path.resolve(dir, filename);
    const stat = fs.statSync(filepath);
    const isFile = stat.isFile();
    const content = fs.readFileSync(filepath, 'utf-8')

    if (isFile) files.push({ filepath, name, ext, content });
  });

  files.sort((a, b) => {
    // natural sort alphanumeric strings
    // https://stackoverflow.com/a/38641281
    return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
  });

  // return files;
  console.log(files)
}

const files = readFilesSync('src/');

