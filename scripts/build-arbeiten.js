const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "..", "content", "arbeiten");
const outputDir = path.join(__dirname, "..", "assets", "data");
const layoutByFile = {
  "02-faellung.md": "project-card-tall",
  "05-garten.md": "project-card-wide"
};

function readWork(fileName) {
  const raw = fs.readFileSync(path.join(sourceDir, fileName), "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const work = {};

  if (!match) return null;

  match[1].split(/\r?\n/).forEach((line) => {
    const separator = line.indexOf(":");

    if (separator === -1) return;

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    work[key] = value;
  });

  if (!work.title || !work.image) return null;

  work.layout = layoutByFile[fileName] || "";
  return work;
}

const works = fs
  .readdirSync(sourceDir)
  .filter((fileName) => fileName.endsWith(".md"))
  .sort()
  .map(readWork)
  .filter(Boolean);

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, "arbeiten.json"),
  `${JSON.stringify(works, null, 2)}\n`
);
