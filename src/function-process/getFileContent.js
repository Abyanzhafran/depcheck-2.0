const fs = require('fs')
const path = require('path')

function getFileContentFromSpecificDir(dir) {
  let fileContent = []
  const files = fs.readdirSync(dir)

  files.forEach(filename => {
    const filePath = path.join(dir, filename)
    const stat = fs.statSync(filePath)

    if (filename === "node_modules") {
      return

    } else if (filename === "package.json") {
      const data = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const content = Object.values(JSON.parse(data)["scripts"]).toString()
      fileContent.push({ filename, content })

    } else if (stat.isDirectory()) {
      fileContent = fileContent.concat(getFileContentFromSpecificDir(filePath))

    } else if (
      path.extname(filename) === '.js' ||
      path.extname(filename) === '.vue' ||
      path.extname(filename) === '.jsx' ||
      path.extname(filename) === '.ts' ||
      path.extname(filename) === '.cjs'
    ) {
      const content = fs.readFileSync(path.join(dir, filename), 'utf-8')
      fileContent.push({ filename, content })
    }
  });

  return fileContent
}

function getPackageJsonDependencies(dir) {
  let packageContent = []
  const files = fs.readdirSync(dir)

  files.forEach(filename => {
    const filePath = path.join(dir, filename)
    const stat = fs.statSync(filePath)

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
      packageContent = packageContent.concat(getPackageJsonDependencies(filePath))
    }
  })

  return packageContent
}

module.exports = {
  getFileContentFromSpecificDir,
  getPackageJsonDependencies
}

