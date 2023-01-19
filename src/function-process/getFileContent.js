const fs = require('fs');
const path = require('path');

function getFileContentFromSpecificDir(dir) {
  if (dir != undefined) {
    let fileContent = [];
    const files = fs.readdirSync(dir);

    files.forEach(filename => {
      const filePath = path.join(dir, filename)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        fileContent = fileContent.concat(getFileContentFromSpecificDir(filePath))

      } else if (path.extname(filename) === '.js') {
        const content = fs.readFileSync(path.join(dir, filename), 'utf-8')
        fileContent.push({ filename, content })
      }
    });

    return fileContent
  } else {

    let fileContent = []

    fs.readdirSync('.').forEach(filename => {
      const ext = path.parse(filename).ext
      if (ext === '.js') {
        const filepath = path.resolve(filename)
        const content = fs.readFileSync(filepath, 'utf-8')
        fileContent.push({ filename, content })
      }
    })

    return fileContent
  }

}

module.exports = {
  getFileContentFromSpecificDir
}

