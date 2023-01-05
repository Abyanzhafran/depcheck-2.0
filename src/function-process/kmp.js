// Use KMP algorithm to search for dependencies in the javaScript files
function kmpSearch(pattern, text) {
  const m = pattern.length;
  const n = text.length;
  let fail = new Array(m);
  fail[0] = 0;
  for (let i = 1; i < m; i++) {
    let j = fail[i - 1];
    while (j && pattern[j] !== pattern[i]) {
      j = fail[j - 1];
    }
    fail[i] = pattern[j] === pattern[i] ? j + 1 : 0;
  }

  let j = 0;
  for (let i = 0; i < n; i++) {
    while (j && pattern[j] !== text[i]) {
      j = fail[j - 1];
    }
    if (pattern[j] === text[i]) {
      j++;
      if (j === m) {
        return true;
      }
    }
  }
  return false;
}

module.exports = { kmpSearch }