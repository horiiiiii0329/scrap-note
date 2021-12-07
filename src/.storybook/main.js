module.exports = {
  stories: [
    "../components/**/*.stories.mdx",
    "../**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss",
  ],
  core: {
    builder: "webpack5",
  },
  typescript: { reactDocgen: false },
};
