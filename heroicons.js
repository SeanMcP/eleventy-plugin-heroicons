const ICONS = require('./icons')

const initialConfig = {
  className: "",
  errorOnMissing: false,
};

module.exports = function heroicons(eleventyConfig, config = initialConfig) {
    function heroicon(context = this, style, name, alt, classes, dimensions) {
        if (!style || !name) {
          throw new Error("Please provide a style (outline|solid) and name");
        }

        const ofStyle = ICONS[style.toUpperCase()];
        if (!ofStyle) {
          const message = `Invalid heroicon style "${style}"`;
          if (config.errorOnMissing) {
            throw new Error(message);
          } else {
            console.warn(message + ` in ${context.page.inputPath}`);
            return "";
          }
        }

        const contents = ofStyle[name];
        if (!contents) {
          const message = `No heroicon found for name "${name}"`;
          if (config.errorOnMissing) {
            throw new Error(message);
          } else {
            console.warn(message + ` in ${context.page.inputPath}`);
            return "";
          }
        }

        if (!contents) return "";

        return `${head(
          alt,
          (config.className + ' ' + classes),
          dimensions,
          name,
          style
        )}${contents}${ICONS.TAIL}`;
    }

  eleventyConfig.addShortcode("heroicon", function(style, name, alt, classes, dimensions) {
      return heroicon(this, style, name, alt, classes, dimensions)
  });
  eleventyConfig.addShortcode("heroicon_outline", function(name, alt, classes, dimensions) {
      return heroicon(this, 'outline', name, alt, classes, dimensions)
  });
  eleventyConfig.addShortcode("heroicon_solid", function(name, alt, classes, dimensions) {
      return heroicon(this, 'solid', name, alt, classes, dimensions)
  });
};

function head(alt, iconClasses, iconDimensions, iconName, iconStyle) {
  return (
    ICONS.HEAD[iconStyle].slice(0, -1) +
    (alt ? "" : ` aria-hidden="true"`) +
    (iconClasses ? ` class="${iconClasses.replace(/^\s+/, '')}"` : '') +
    ` data-heroicon-name="${iconName}" data-heroicon-style="${iconStyle}"` +
    (iconDimensions ? ` height="${iconDimensions}"` : '') +
    (iconDimensions ? ` width="${iconDimensions}"` : '') +
    '>' +
    (alt ? `<title>${alt}</title>` : "")
  );
}
