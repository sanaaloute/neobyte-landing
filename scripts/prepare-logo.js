// Processes the NeoByte logo source image into the site's brand assets.
// Usage: node scripts/prepare-logo.js <source-image>
// Requires: npm i sharp (run from a dir where sharp is installed, or set
// NODE_PATH to a node_modules containing it).
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "public", "brand");
const APP = path.join(__dirname, "..", "src", "app");

// Fraction of the trimmed width occupied by the head mark (rest is wordmark).
const MARK_SPLIT = 0.36;

async function toTransparent(buffer) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  // Sample the four corners to estimate the background color.
  const px = (x, y) => {
    const i = (y * info.width + x) * info.channels;
    return [data[i], data[i + 1], data[i + 2]];
  };
  const corners = [
    px(0, 0),
    px(info.width - 1, 0),
    px(0, info.height - 1),
    px(info.width - 1, info.height - 1),
  ];
  const bg = corners.reduce((a, c) => [a[0] + c[0] / 4, a[1] + c[1] / 4, a[2] + c[2] / 4], [0, 0, 0]);
  const tolerance = 30;
  for (let i = 0; i < data.length; i += info.channels) {
    const dr = data[i] - bg[0];
    const dg = data[i + 1] - bg[1];
    const db = data[i + 2] - bg[2];
    if (dr * dr + dg * dg + db * db < tolerance * tolerance) {
      data[i + 3] = 0;
    }
  }
  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  }).png();
}

async function recolorWhite(buffer) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += info.channels) {
    if (data[i + 3] > 0) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
  }
  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  }).png();
}

// Center an image on a square canvas with padding (transparent background).
async function square(buffer, size, padRatio = 0.08) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const resized = await sharp(buffer)
    .resize(inner, inner, { fit: "inside" })
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toBuffer();
}

// Center an image on a colored canvas.
async function onBackground(buffer, width, height, color, scale = 0.5) {
  const resized = await sharp(buffer)
    .resize(Math.round(width * scale), Math.round(height * scale), {
      fit: "inside",
      withoutEnlargement: true,
    })
    .toBuffer();
  return sharp({ create: { width, height, channels: 3, background: color } })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toBuffer();
}

(async () => {
  const src = process.argv[2];
  if (!src || !fs.existsSync(src)) {
    console.error("usage: node scripts/prepare-logo.js <source-image>");
    process.exit(1);
  }
  fs.mkdirSync(OUT, { recursive: true });

  const trimmed = await sharp(src).trim({ threshold: 12 }).toBuffer();
  const meta = await sharp(trimmed).metadata();
  const markWidth = Math.round(meta.width * MARK_SPLIT);
  const mark = await sharp(trimmed)
    .extract({ left: 0, top: 0, width: markWidth, height: meta.height })
    .toBuffer();

  const fullT = await toTransparent(trimmed).then((s) => s.toBuffer());
  const markT = await toTransparent(mark).then((s) => s.toBuffer());
  const fullW = await recolorWhite(fullT).then((s) => s.toBuffer());
  const markW = await recolorWhite(markT).then((s) => s.toBuffer());

  const w = (name, buf) => fs.writeFileSync(path.join(OUT, name), buf);

  w("logo-full.png", fullT);
  w("logo-full-white.png", fullW);
  w("logo-mark.png", await square(markT, 512));
  w("logo-mark-white.png", await square(markW, 512));
  w("logo-mark-32.png", await square(markT, 32));
  w("apple-touch-icon.png", await onBackground(markT, 180, 180, "#f2f2f2", 0.85));
  // Open Graph image: navy brand background, white full lockup centered.
  w("og.png", await onBackground(fullW, 1200, 630, "#0e1621", 0.62));

  // App-router icons (replace the generic "N" icon.svg).
  fs.writeFileSync(path.join(APP, "icon.png"), await square(markT, 64));
  fs.writeFileSync(path.join(APP, "apple-icon.png"), await onBackground(markT, 180, 180, "#f2f2f2", 0.85));
  const stale = path.join(APP, "icon.svg");
  if (fs.existsSync(stale)) fs.rmSync(stale);

  console.log("brand assets written to", OUT);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
