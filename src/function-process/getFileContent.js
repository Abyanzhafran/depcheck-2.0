const fs = require('fs');
const path = require('path');

function getFileContentFromSpecificDir(dir) {
  let fileContent = [];
  const files = fs.readdirSync(dir);

  files.forEach(filename => {
    const filePath = path.join(dir, filename)
    const stat = fs.statSync(filePath)

    if (filename === "node_modules") {
      return;
    } else if (stat.isDirectory()) {
      fileContent = fileContent.concat(getFileContentFromSpecificDir(filePath))

    } else if (
      path.extname(filename) === '.js' ||
      path.extname(filename) === '.vue' ||
      path.extname(filename) === '.jsx' ||
      path.extname(filename) === '.ts'
    ) {
      const content = fs.readFileSync(path.join(dir, filename), 'utf-8')
      fileContent.push({ filename, content })
    }
  });

  return fileContent
}

module.exports = {
  getFileContentFromSpecificDir
}

