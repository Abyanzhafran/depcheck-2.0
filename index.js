const { kmpSearch } = require("./src/function-process/kmp");
const {
  getFileContentFromSpecificDir,
  getInstalledPackageJsonDependencies,
} = require("./src/function-process/getFileContent");

function depsChecker() {
  const files = [];
  const packages = getInstalledPackageJsonDependencies(".");

  // don't change this line, default config
  files.push(
    getFileContentFromSpecificDir(".", [".js", ".jsx", ".ts", ".cjs", ".json"])
  );

  // merge deps and devDeps
  let mergedDeps = new Set();
  let mergedDevDeps = new Set();

  for (const i of packages) {
    mergedDeps = new Set([...mergedDeps, ...Array.from(i.dependencies)]);
    mergedDevDeps = new Set([
      ...mergedDevDeps,
      ...Array.from(i.devDependencies),
    ]);
  }

  // Iterate through files data stack to get the content
  for (const i in files) {
    for (const j of files[i]) {
      for (const deps of mergedDeps) {
        if (kmpSearch(deps, j.content)) {
          mergedDeps.delete(deps);
        }
      }

      for (const devDeps of mergedDevDeps) {
        if (kmpSearch(devDeps, j.content)) {
          mergedDevDeps.delete(devDeps);
        }
      }
    }
  }

  // Print unused dependencies
  console.log("Unused dependencies : ", Array.from(mergedDeps));
  console.log("Unused devDependencies : ", Array.from(mergedDevDeps));
}

module.exports = { depsChecker };
