const fs = require('fs');
const path = require('path');

function getFileContentFromSpecificDir(dir) {
  const fileContent = []

  if (dir != undefined) {
    fs.readdirSync(dir).forEach(filename => {
      const ext = path.parse(filename).ext
      const filepath = path.resolve(dir, filename)
      const stat = fs.statSync(filepath)
      const isFile = stat.isFile()
      const content = fs.readFileSync(filepath, 'utf-8')

      // Read file
      if (isFile == true && ext == '.js' || filename == 'package.json')
        fileContent.push({ filename, content })
    });

    return fileContent

  } else {

    // Read root folder if the function args empty
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

