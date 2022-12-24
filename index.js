const fs = require('fs');
const path = require('path')
const kmp = require('./function-detect/kmp')

// KMP example
// var txt = "loremipsumdolorsitametkonitulah lorem ipsum dolor itulahmemang"
// var pat = "itulah"
// kmp.KMPSearch(pat, txt)


// Read root file and read installed packages
fs.readdir('./', (err, files) => {
  const rootFiles = []
  const installedPackages = []

  files.forEach(filename => {
    const ext = path.parse(filename).ext
    const filepath = path.resolve(__dirname, filename)
    const stat = fs.statSync(filepath)
    const isFile = stat.isFile()

    // read root file
    if (isFile == true && ext == '.js') {
      const content = fs.readFileSync(filepath, 'utf-8')
      rootFiles.push({ content })
    }

    // read installed packages
    if (isFile == true && filename == 'package-test.json') {
      const content = fs.readFileSync(filepath, 'utf-8')
      const dependencyList = JSON.parse(content)
      installedPackages.push(Object.values(dependencyList.packages)[0].dependencies)
    }
  });

  // return rootFiles
  console.log(installedPackages)
  console.log(rootFiles)
});

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

// Add your path to check the package
// By default its check "src" path and "root directory"
readFilesSync('src/')

// read node_modules, do not change this line
// readFilesSync('node_modules_test/')
// readFilesSync('function-detect/')



