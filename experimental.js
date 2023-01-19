const fs = require('fs');
const path = require('path');

function getAllJSFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllJSFiles(filePath));
    } else if (path.extname(file) === '.js') {
      results.push(filePath);
    }
  });

  return results;
}

// Usage
const jsFiles = getAllJSFiles('./src');
console.log(jsFiles);

