function createKmpTable(pattern) {
  const table = [0];
  let prefixIndex = 0;
  let suffixIndex = 1;

  while (suffixIndex < pattern.length) {
    if (pattern[prefixIndex] === pattern[suffixIndex]) {
      prefixIndex += 1;
      table[suffixIndex] = prefixIndex;
      suffixIndex += 1;
    } else if (prefixIndex === 0) {
      table[suffixIndex] = 0;
      suffixIndex += 1;
    } else {
      prefixIndex = table[prefixIndex - 1];
    }
  }

  return table;
}

function kmpSearch(text, pattern) {
  const table = createKmpTable(pattern);
  let textIndex = 0;
  let patternIndex = 0;

  while (textIndex < text.length) {
    if (text[textIndex] === pattern[patternIndex]) {
      if (patternIndex === pattern.length - 1) {
        return true;
      }
      textIndex += 1;
      patternIndex += 1;
    } else if (patternIndex > 0) {
      patternIndex = table[patternIndex - 1];
    } else {
      textIndex += 1;
    }
  }

  return false;
}

module.exports = { kmpSearch }