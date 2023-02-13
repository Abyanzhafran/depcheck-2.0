const fs = require('fs');
const path = require('path');

function kmpSearch(pattern, fileContent) {
  const results = [];

  fileContent.forEach(file => {
    if (!fs.existsSync(file.filename)) {
      return
    }

    const lines = file.content.split("\n");
    lines.forEach((line, lineNumber) => {
      const m = pattern.length;
      const n = line.length;
      let fail = new Array(m);
      fail[0] = 0;
      for (let i = 1; i < m; i++) {
        let j = fail[i - 1];
        while (j && pattern[j] !== line[i]) {
          j = fail[j - 1];
        }
        fail[i] = line[j] === line[i] ? j + 1 : 0;
      }

      let j = 0;
      for (let i = 0; i < n; i++) {
        while (j && pattern[j] !== line[i]) {
          j = fail[j - 1];
        }
        if (pattern[j] === line[i]) {
          j++;
          if (j === m) {
            results.push({
              filename: file.filename,
              location: path.resolve(path.resolve(file.filename)),
              lineNumber: lineNumber + 1,
              line: line
            });
          }
        }
      }
    });
  });

  return results;
}

module.exports = { kmpSearch }

