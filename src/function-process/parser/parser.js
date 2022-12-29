const fs = require('fs');
const {
  getFileContentFromSpecificDir
} = require('../../../index')
const { KMPSearch } = require('../algorithm/kmp')

var txt = "loremipsumdolorsitametkonsekuensi ametkonse itulahametkonse";
var pat = "ametkonse";
KMPSearch(pat, txt)

// By default its check "src" path and "root directory"
// do not change this line
// for final testing, change to ./src (temp)
console.log(getFileContentFromSpecificDir('./src/file-test'))
console.log(getFileContentFromSpecificDir())


// make your config here
// console.log(getFileContentFromSpecificDir('./your-folder-name'))

// read all installed package
var installedDependencies = []
const packageJson = JSON.parse(fs.readFileSync('package-test.json'))
const dependencies = packageJson.dependencies;
const devDependencies = packageJson.devDependencies

installedDependencies.push({ dependencies, devDependencies })

console.log(installedDependencies)