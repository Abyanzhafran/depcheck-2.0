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

module.exports = { kmpSearch };

// // Use KMP algorithm to search for dependencies in the JavaScript files
// function kmpSearch(pattern, text) {
//   // Get the length of the pattern and the text
//   const m = pattern.length;
//   const n = text.length;

//   // Initialize the "fail" array to store failure function values
//   let fail = new Array(m);
//   fail[0] = 0;

//   // Build the failure function ("fail" array)
//   for (let i = 1; i < m; i++) {
//     let j = fail[i - 1];
//     while (j && pattern[j] !== pattern[i]) {
//       j = fail[j - 1];
//     }
//     fail[i] = pattern[j] === pattern[i] ? j + 1 : 0;
//   }

//   // Initialize a pointer "j" for the pattern
//   let j = 0;

//   // Start searching for the pattern in the text
//   for (let i = 0; i < n; i++) {
//     while (j && pattern[j] !== text[i]) {
//       j = fail[j - 1];
//     }
//     if (pattern[j] === text[i]) {
//       j++;
//       // If the pattern is completely found, return true
//       if (j === m) {
//         return true;
//       }
//     }
//   }

//   // If the loop completes without finding a complete pattern match, return false
//   return false;
// }

// // Export the function to be used by other modules
// module.exports = { kmpSearch };
