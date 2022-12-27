const fs = require('fs');
const {
  getFileContentFromSpecificDir
} = require('../../index')

// By default its check "src" path and "root directory"
// do not change this line
console.log(getFileContentFromSpecificDir('./src'))
console.log(getFileContentFromSpecificDir())

// read all installed package
var installedDependencies = []
const packageJson = JSON.parse(fs.readFileSync('package.json'))
const dependencies = packageJson.dependencies;

installedDependencies.push(dependencies)

console.log('this is parser')
console.log(installedDependencies)