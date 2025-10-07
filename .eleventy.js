module.exports = function (eleventyConfig) {
    // Copy static assets
    eleventyConfig.addPassthroughCopy({ "src/css": "css" });
    eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  
    return {
      dir: {
        input: "src",
        output: "dist",
        includes: "_includes",
      },
    };
  };
  