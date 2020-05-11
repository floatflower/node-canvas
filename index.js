const Canvas = require('./lib/canvas')
const Image = require('./lib/image')
const CanvasRenderingContext2D = require('./lib/context2d')
const parseFont = require('./lib/parse-font')
const packageJson = require('./package.json')
const bindings = require('./lib/bindings')
const PNGStream = require('./lib/pngstream')
const PDFStream = require('./lib/pdfstream')
const JPEGStream = require('./lib/jpegstream')
const DOMMatrix = require('./lib/DOMMatrix').DOMMatrix
const DOMPoint = require('./lib/DOMMatrix').DOMPoint

function createCanvas (width, height, type) {
  return new Canvas(width, height, type)
}

function createImageData (array, width, height) {
  return new bindings.ImageData(array, width, height)
}

function loadImage (src) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    function cleanup () {
      image.onload = null
      image.onerror = null
    }

    image.onload = () => { cleanup(); resolve(image) }
    image.onerror = (err) => { cleanup(); reject(err) }

    image.src = src
  })
}
module.exports = {
  Canvas,
  Context2d: CanvasRenderingContext2D, // Legacy/compat export
  CanvasRenderingContext2D,
  CanvasGradient: bindings.CanvasGradient,
  CanvasPattern: bindings.CanvasPattern,
  Image,
  ImageData: bindings.ImageData,
  PNGStream,
  PDFStream,
  JPEGStream,
  DOMMatrix,
  DOMPoint,

  parseFont,

  createCanvas,
  createImageData,
  loadImage,

  backends: bindings.Backends,

  /** Library version. */
  version: packageJson.version,
  /** Cairo version. */
  cairoVersion: bindings.cairoVersion,
  /** jpeglib version. */
  jpegVersion: bindings.jpegVersion,
  /** gif_lib version. */
  gifVersion: bindings.gifVersion ? bindings.gifVersion.replace(/[^.\d]/g, '') : undefined,
  /** freetype version. */
  freetypeVersion: bindings.freetypeVersion,
  /** rsvg version. */
  rsvgVersion: bindings.rsvgVersion
}
