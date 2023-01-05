const fs = require('fs');
const path = require('path');

// Read package.json file
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package-test-1.json'), 'utf8'));

// Get list of dependencies from package.json
const dependencies = new Set(Object.keys(packageJson.dependencies));

// Read all JavaScript files in the project
const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));

// Use KMP algorithm to search for dependencies in the JavaScript files
const kmpSearch = (pattern, text) => {
  const m = pattern.length;
  const n = text.length;
  let fail = new Array(m);
  fail[0] = 0;
  for (let i = 1; i < m; i++) {
    let j = fail[i - 1];
    while (j && pattern[j] !== pattern[i]) {
      j = fail[j - 1];
    }
    fail[i] = pattern[j] === pattern[i] ? j + 1 : 0;
  }

  let j = 0;
  for (let i = 0; i < n; i++) {
    while (j && pattern[j] !== text[i]) {
      j = fail[j - 1];
    }
    if (pattern[j] === text[i]) {
      j++;
      if (j === m) {
        return true;
      }
    }
  }
  return false;
};

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

