const ICONS = require("./icons");

const initialConfig = {
  className: "",
  errorOnMissing: false,
};

const FORBIDDEN_ATTRIBUTES = ["aria-hidden", "aria-label"];

module.exports = function heroicons(eleventyConfig, config = initialConfig) {
  function heroicon(context = this, style, name, alt, attributes) {
    if (!style || !name) {
      throw new Error("Please provide a valid icon style and name");
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

    if (attributes) {
      for (const attr of FORBIDDEN_ATTRIBUTES) {
        let isInvalid = false;
        const invalidMessage = `ARIA attributes are handled automatically with the "alt" argument. Forbidden attribute "${attr}" detected`;

        if (typeof attributes === "string") {
          isInvalid = attributes.includes(attr);
        } else {
          isInvalid = attributes.hasOwnProperty(attr);
        }

        if (isInvalid) {
          if (config.errorOnMissing) {
            throw new Error(invalidMessage);
          } else {
            console.warn(invalidMessage + ` in ${context.page.inputPath}`);
            return "";
          }
        }
      }
    }

    return `${head(alt, config.className, name, style, attributes)}${contents}${
      ICONS.TAIL
    }`;
  }

  eleventyConfig.addShortcode("heroicon", function (style, name, alt, attrs) {
    return heroicon(this, style, name, alt, attrs);
  });
  eleventyConfig.addShortcode("heroicon_outline", function (name, alt, attrs) {
    return heroicon(this, "outline", name, alt, attrs);
  });
  eleventyConfig.addShortcode("heroicon_solid", function (name, alt, attrs) {
    return heroicon(this, "solid", name, alt, attrs);
  });
  eleventyConfig.addShortcode("heroicon_micro", function (name, alt, attrs) {
    return heroicon(this, "micro", name, alt, attrs);
  });
  eleventyConfig.addShortcode("heroicon_mini", function (name, alt, attrs) {
    return heroicon(this, "mini", name, alt, attrs);
  });
};

function head(alt, className, iconName, iconStyle, attrs) {
  let output = ICONS.HEAD[iconStyle].slice(0, -1); // Open tag
  if (!alt) output += ` aria-hidden="true"`;
  if (className) output += ` class="${className}"`;
  output += ` data-heroicon-name="${iconName}" data-heroicon-style="${iconStyle}"`;

  if (attrs) {
    if (typeof attrs === "string") {
      output += ` ${attrs}`;
    } else {
      Object.entries(attrs).forEach(([property, value]) => {
        if (property && value) {
          output += ` ${property}="${value}"`;
        }
      });
    }
  }

  output += ">"; // Close tag
  if (alt) output += `<title>${alt}</title>`;

  return output;
}
