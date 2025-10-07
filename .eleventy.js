module.exports = function (eleventyConfig) {
    // Copy compiled CSS and JS to output
    eleventyConfig.addPassthroughCopy({ "src/css": "css" });
    eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  
    return {
      dir: {
        input: "src",
        output: "dist",
        includes: "_includes",
      },
      pathPrefix: "/sheenmo/"
    };
  };
  