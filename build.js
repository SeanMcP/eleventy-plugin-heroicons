const fs = require("fs");

const CONTENTS = {
  OUTLINE: {},
  SOLID: {},
  SHARED: {
    head: "",
    tail: "",
  },
};

const subDirs = ["outline", "solid"];

subDirs.forEach((subDir) => {
  const path = `./node_modules/heroicons/${subDir}/`;
  const fileNames = fs.readdirSync(path);

  const object = CONTENTS[subDir.toUpperCase()];

  fileNames.forEach((filename) => {
    const contents = fs.readFileSync(path + filename).toString().trimEnd();
    const lines = contents.split("\n");
    if (!CONTENTS.SHARED.head) {
      CONTENTS.SHARED.head = lines[0];
    }
    if (!CONTENTS.SHARED.tail) {
      CONTENTS.SHARED.tail = lines[lines.length - 1];
    }
    const guts = lines.slice(1, lines.length - 1).join("").replace(/\ \ /g, '');
    object[filename.slice(0, -4)] = guts;
  });
});

const contents = fs.readFileSync('./heroicons.js').toString();
const built = contents.replace(/const ICONS = (.*)/, `const ICONS = ${JSON.stringify(CONTENTS)}`).replace(/\/\/ head: (.*)/, '// head: ' + CONTENTS.SHARED.head)
fs.writeFileSync('./heroicons.js', built)
