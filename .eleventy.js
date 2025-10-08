module.exports = function (eleventyConfig) {
    // Copy compiled CSS and JS to output
    eleventyConfig.addPassthroughCopy({ "src/css": "css" });
    eleventyConfig.addPassthroughCopy({ "src/js": "js" });
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/favicon.ico");
  
    return {
      dir: {
        input: "src",
        output: "dist",
        includes: "_includes",
      }
    };
  };
  