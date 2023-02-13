const fs = require('fs')
const path = require('path')

function getFileContentFromSpecificDir(dir) {
  let fileContent = []
  const files = fs.readdirSync(dir)

  files.forEach(filename => {
    const filePath = path.join(dir, filename)
    const stat = fs.statSync(filePath)

    if (!fs.existsSync(filename)) {
      return
    }

    if (filename === "package.json") {
      let data = fs.readFileSync(path.join(dir, filename), 'utf-8')
      let jsonData
      try {
        jsonData = JSON.parse(data)
      } catch (error) {
        return
      }

      let content = jsonData["scripts"]
        ? Object.values(jsonData["scripts"]).toString()
        : ""

      fileContent.push({ filename, content })

    } else if (stat.isDirectory()) {
      fileContent = fileContent.concat(getFileContentFromSpecificDir(filePath))

    } else if (
      path.extname(filename) === '.js' ||
      path.extname(filename) === '.vue' ||
      path.extname(filename) === '.jsx' ||
      path.extname(filename) === '.ts' ||
      path.extname(filename) === '.cjs' ||
      path.extname(filename) === '.json'
    ) {
      let content = '';
      if (path.extname(filename) === '.json') {
        let jsonContent = fs.readFileSync(path.join(dir, filename), 'utf-8')
        jsonContent = jsonContent.replace(/\/\/.*/g, ''); // Remove json single-line comments
        jsonContent = jsonContent.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove json multi-line comments

        content = `optionalDependencies: ${Object.values(jsonContent.optionalDependencies ||
          {}).toString()}\npeerDependencies: ${Object.values(jsonContent.peerDependencies ||
            {}).toString()}`

      } else {
        content = fs.readFileSync(path.join(dir, filename), 'utf-8');
      }
      fileContent.push({ filename, content });
    }
  });

  return fileContent
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