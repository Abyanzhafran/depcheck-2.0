const fs = require('fs');
const path = require('path');
const { kmpSearch } = require('./src/function-process/kmp')
const { getFileContentFromSpecificDir } = require('./src/function-process/getFileContent')

// Read package.json file
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package-test-1.json'), 'utf8'));

// Get list of dependencies from package.json
const dependencies = new Set(Object.keys(packageJson.dependencies));

// Read all javaScript files in the project
const files = []
files.push(getFileContentFromSpecificDir('./src/file-test'))
files.push(getFileContentFromSpecificDir())

for (const i in files) {
  for (const j of files[i]) {
    // return j.content
    for (const deps of dependencies) {
      if (kmpSearch(deps, j.content)) {
        dependencies.delete(deps)
      }
    }
  }
}

// Original code
// for (const file of files) {
//   const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
//   for (const dependency of dependencies) {
//     if (kmpSearch(dependency, content)) {
//       dependencies.delete(dependency);
//     }
//   }
// }

// Print unused dependencies
console.log(Array.from(dependencies));

