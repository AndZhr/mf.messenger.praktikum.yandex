const fse = require('fs-extra');

const srcDir = `static`;
const destDir = `dist`;

fse.copySync(srcDir, destDir, { overwrite: true }, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("success!");
  }
});
