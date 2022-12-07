const fs = require('fs');

try {
  const data1 = fs.readFileSync('lorem.js', 'utf8');
  const data2 = fs.readFileSync('ipsum.js', 'utf8');
  console.log("data1 : ", data1);
  console.log("data2 : ", data2);
  if (data1 === data2) {
    console.log(true)
  } else {
    console.log(false)
  }
} catch (err) {
  console.error(err);
}

