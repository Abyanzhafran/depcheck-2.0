const fs = require('fs');
const path = require('path');
const { kmpSearch } = require('./src/kmp')

// Read package.json file
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package-test-1.json'), 'utf8'));

// Get list of dependencies from package.json
const dependencies = new Set(Object.keys(packageJson.dependencies));

// Read all JavaScript files in the project
const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));

for (const file of files) {
  const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
  for (const dependency of dependencies) {
    if (kmpSearch(dependency, content)) {
      dependencies.delete(dependency);
    }
  }
}

// Print unused dependencies
console.log(Array.from(dependencies));

