// const { execSync } = require('child_process');

// try {
//   const output = execSync('npm list --depth=0').toString()
//   console.log(output);
// } catch (error) {
//   console.error(error);
// }

// ========================================
// const fs = require('fs');

// async function readAllFiles(dir) {
//   const files = await fs.promises.readdir(dir);
//   for (const file of files) {
//     const filePath = `${dir}/${file}`;
//     const stats = await fs.promises.lstat(filePath);
//     if (stats.isDirectory()) {
//       readAllFiles(filePath);
//     } else {
//       console.log(`File: ${filePath}`);
//       console.log(await fs.promises.readFile(filePath, 'utf-8'));
//     }
//   }
// }

// // Example usage:
// readAllFiles('/src');

const fs = require('fs');

async function readAllFiles(dir) {
  const rootFilesContent = []

  const files = await fs.promises.readdir(dir);
  for (const file of files) {
    const filePath = `${dir}/${file}`;
    const stats = await fs.promises.lstat(filePath);
    if (stats.isDirectory()) {
      readAllFiles(filePath);
    } else {
      var content = ('content : ', await fs.promises.readFile(filePath, 'utf-8'))
      rootFilesContent.push({ filePath, content })
    }
  }

  // console.log(rootFilesContent)
  return rootFilesContent
}

// Example usage:
readAllFiles('./src');

module.exports = { readAllFiles }
