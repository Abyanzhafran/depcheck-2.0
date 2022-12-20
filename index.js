const fs = require('fs');
const path = require('path')

// Read root file
fs.readdir('./', (err, files) => {
  const rootFiles = []

  files.forEach(filename => {
    const ext = path.parse(filename).ext
    const filepath = path.resolve(__dirname, filename)
    const stat = fs.statSync(filepath)
    const isFile = stat.isFile()
    // console.log(isFile)
    if (isFile == true && ext == '.js') {
      const content = fs.readFileSync(filepath, 'utf-8')
      rootFiles.push({ content })
    }
  });

  return rootFiles
});

function readFilesSync(dir) {
  const files = []
  // console.log(dir)

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

// Add your path to check the package
// By default its check "src" path and "root directory"
readFilesSync('src/')
readFilesSync('node_modules_test/')



