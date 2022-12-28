const fs = require('fs');
const path = require('path');

function getFileContentFromSpecificDir(dir) {
  const fileContent = []

  if (dir != undefined) {
    fs.readdirSync(dir).forEach(filename => {
      const name = path.parse(filename).name
      const ext = path.parse(filename).ext
      const filepath = path.resolve(dir, filename)
      const stat = fs.statSync(filepath)
      const isFile = stat.isFile()
      const content = fs.readFileSync(filepath, 'utf-8')

      // read file
      if (isFile == true && ext == '.js' || filename == 'package.json')
        fileContent.push({ filename, content })
    });

    return fileContent

  } else {

    const files = fs.readdirSync('.');
    const jsFiles = files.filter(file => file.endsWith('.js'));
    return jsFiles
  }
}

function readFilesSync(dir) {
  const files = []

  fs.readdirSync(dir).forEach(filename => {
    const name = path.parse(filename).name
    const ext = path.parse(filename).ext
    const filepath = path.resolve(dir, filename)
    const stat = fs.statSync(filepath)
    const isFile = stat.isFile()
    const content = fs.readFileSync(filepath, 'utf-8')

    if (isFile) files.push({ dir, filepath, name, ext, content })
  });

  files.sort((a, b) => {
    // natural sort alphanumeric strings
    // https://stackoverflow.com/a/38641281
    return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
  });

  return files;
}

module.exports = {
  getFileContentFromSpecificDir,
  readFilesSync
}

