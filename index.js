const fs = require('fs');
const path = require('path');
const { kmpSearch } = require("./src/kmp")

// Read the dependencies from the package.json file
const packageJson = JSON.parse(fs.readFileSync('package.json'));
const dependencies = new Set(Object.keys(packageJson.dependencies));

// Read the source code files
const sourceCodeDir = 'src';
const sourceCodeFiles = fs.readdirSync(sourceCodeDir);

// Iterate over the source code files and search for patterns of package names using the KMP algorithm
sourceCodeFiles.forEach(sourceCodeFile => {
  const sourceCode = fs.readFileSync(path.join(sourceCodeDir, sourceCodeFile), 'utf8');
  dependencies.forEach(dependency => {
    if (kmpSearch(sourceCode, dependency)) {
      dependencies.delete(dependency);
    }
  });
});

// Print the unused dependencies
console.log('Unused dependencies:', dependencies);
