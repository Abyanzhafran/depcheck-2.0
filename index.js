const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');
const { kmpSearch } = require('./src/function-process/kmp')
const { getFileContentFromSpecificDir } = require('./src/function-process/getFileContent')

const start = performance.now();

const packageJson = JSON.parse(fs.readFileSync(path.join('../../', 'package.json'), 'utf8'));
const dependencies = new Set(Object.keys(packageJson.dependencies));
const devDependencies = new Set(Object.keys(packageJson.devDependencies));

const files = []

// don't change this line, default config
const packageScript = Object.values(packageJson.scripts).toString();
files.push(getFileContentFromSpecificDir('../../'))
files[0].push({ filename: 'packageJsonScripts', content: packageScript })

for (const i in files) {
  for (const j of files[i]) {
    for (const deps of dependencies) {
      if (kmpSearch(deps, j.content)) {
        dependencies.delete(deps)
      }
    }

    for (const devDeps of devDependencies) {
      if (kmpSearch(devDeps, j.content)) {
        devDependencies.delete(devDeps)
      }
    }
  }
}

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
console.log('Unused dependencies : ', Array.from(dependencies));
console.log('Unused devDependecies : ', Array.from(devDependencies));

const end = performance.now();
const executionTime = end - start;
console.log(`Execution time: ${executionTime} ms`);
