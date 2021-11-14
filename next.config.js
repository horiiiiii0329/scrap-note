/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
};

const withSass = require("@zeit/next-sass");
module.exports = withSass({
  cssModules: true,
});
