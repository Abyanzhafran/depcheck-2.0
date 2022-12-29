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

      // read file
      if (isFile == true && ext == '.js' || filename == 'package.json')
        fileContent.push({ filename, content })
    });

    return fileContent

  } else {

    const files = fs.readdirSync('.');
    const jsFiles = files.filter(file => file.endsWith('.js'));
    return jsFiles
  }
}

module.exports = {
  getFileContentFromSpecificDir
}

