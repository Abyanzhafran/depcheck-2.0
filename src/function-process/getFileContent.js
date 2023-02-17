const fs = require('fs')
const path = require('path')

function getFileContentFromSpecificDir(dir, extensions) {
  if (typeof extensions === 'string') {
    extensions = [extensions];
  }

  const fileContent = [];
  const files = fs.readdirSync(dir);

  files.forEach((filename) => {
    const filePath = path.join(dir, filename);
    const stat = fs.statSync(filePath);

    if (filename === 'node_modules') {
      return
    }

    if (stat.isDirectory()) {
      fileContent.push(...getFileContentFromSpecificDir(filePath, extensions))

    } else {
      const fileExtension = path.extname(filename).toLowerCase()

      if (!extensions.includes(fileExtension)) {
        return
      }

      if (filename === 'package-lock.json') {
        return

      } else if (extensions === '.json' && filename !== 'package.json') {
        const content = fs.readFileSync(filePath, 'utf-8')
        fileContent.push({ filename, content })

      } else if (filename === "package.json") {
        const data = fs.readFileSync(filePath, 'utf-8')
        let jsonData
        try {
          jsonData = JSON.parse(data)
        } catch (error) {
          return
        }

        let contentData = {
          scripts: jsonData.scripts ? Object.values(jsonData["scripts"]) : "",
          optionalDependencies: jsonData.optionalDependencies ? Object.values(jsonData["optionalDependencies"]) : "",
          peerDependencies: jsonData.peerDependencies ? Object.values(jsonData["peerDependencies"]) : "",
        }

        let content = Object.values(contentData).toString()
        fileContent.push({ filename, content })

      } else {
        const content = fs.readFileSync(filePath, 'utf-8');
        fileContent.push({ filename, content });
      }
    }
  });

  return fileContent;
}


function getInstalledPackageJsonDependencies(dir) {
  let packageContent = []
  const files = fs.readdirSync(dir)

  files.forEach(filename => {
    const filePath = path.join(dir, filename)
    const stat = fs.statSync(filePath)

    if (!fs.existsSync(filename)) {
      return
    }

    if (filename === "node_modules") {
      return

    } else if (filename === "package.json") {
      const data = fs.readFileSync(path.join(dir, filename), 'utf-8')

      packageDependencies = JSON.parse(data).dependencies
        ? new Set(Object.keys(JSON.parse(data).dependencies))
        : new Set()
      packageDevDependencies = JSON.parse(data).devDependencies
        ? new Set(Object.keys(JSON.parse(data).devDependencies))
        : new Set()

      packageContent.push({ dependencies: packageDependencies, devDependencies: packageDevDependencies })

    } else if (stat.isDirectory()) {
      packageContent = packageContent.concat(getInstalledPackageJsonDependencies(filePath))
    }
  })

  return packageContent
}

module.exports = {
  getFileContentFromSpecificDir,
  getInstalledPackageJsonDependencies
}