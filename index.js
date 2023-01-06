const fs = require('fs');
const path = require('path');
const { kmpSearch } = require('./src/function-process/kmp')
const { getFileContentFromSpecificDir } = require('./src/function-process/getFileContent')

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package-test-1.json'), 'utf8'));
const dependencies = new Set(Object.keys(packageJson.dependencies));

const files = []

// don't change this line, default config
files.push(getFileContentFromSpecificDir('./src'))
files.push(getFileContentFromSpecificDir())

// Iterate through files data stack to get the content
for (const i in files) {
  for (const j of files[i]) {
    for (const deps of dependencies) {
      if (kmpSearch(deps, j.content)) {
        dependencies.delete(deps)
      }
    }
  }
}

// Print unused dependencies
console.log(Array.from(dependencies));

