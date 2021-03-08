const ICONS = require('./icons')

const initialConfig = {
  className: "",
  errorOnMissing: false,
};

module.exports = function heroicons(eleventyConfig, config = initialConfig) {
    function heroicon(context = this, style, name, alt) {
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
          config.className,
          name,
          style
        )}${contents}${ICONS.SHARED.tail}`;
    }
    
  eleventyConfig.addShortcode("heroicon", function(style, name, alt) {
      return heroicon(this, style, name, alt)
  });
  eleventyConfig.addShortcode("heroicon-outline", function(name, alt) {
      return heroicon(this, 'outline', name, alt)
  });
  eleventyConfig.addShortcode("heroicon-solid", function(name, alt) {
      return heroicon(this, 'solid', name, alt)
  });
};

function head(alt, className, iconName, iconStyle) {
  return (
    ICONS.SHARED.head.slice(0, -1) +
    (alt ? "" : ` aria-hidden="true"`) +
    (className ? ` class="${className}"` : '') +
    ` data-heroicon-name="${iconName}" data-heroicon-style="${iconStyle}"` +
    '>' +
    (alt ? `<title>${alt}</title>` : "")
  );
}
