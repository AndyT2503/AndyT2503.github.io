const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGE_ROOT = path.join(__dirname, '../content/images');
const SOURCE_FILE = 'default.jpg';
const TARGET_WIDTHS = [480, 720, 960];
const JPEG_QUALITY = 78;

async function fileExists(filePath) {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function getBlogImageFolders() {
  const entries = await fs.promises.readdir(IMAGE_ROOT, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(IMAGE_ROOT, entry.name));
}

async function generateVariant(sourcePath, targetPath, width) {
  await sharp(sourcePath)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(targetPath);
}

async function generateResponsiveImages() {
  const folders = await getBlogImageFolders();
  let generatedCount = 0;
  let skippedCount = 0;

  for (const folder of folders) {
    const sourcePath = path.join(folder, SOURCE_FILE);

    if (!(await fileExists(sourcePath))) {
      skippedCount += TARGET_WIDTHS.length;
      console.warn(`Skipped ${path.relative(process.cwd(), folder)}: missing ${SOURCE_FILE}`);
      continue;
    }

    for (const width of TARGET_WIDTHS) {
      const targetPath = path.join(folder, `default-${width}.jpg`);

      await generateVariant(sourcePath, targetPath, width);
      generatedCount += 1;
      console.log(`Generated ${path.relative(process.cwd(), targetPath)}`);
    }
  }

  console.log(
    `Responsive images complete: ${generatedCount} generated, ${skippedCount} skipped.`,
  );
}

generateResponsiveImages().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
