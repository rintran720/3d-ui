import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {},
  staticDirs: [],
  outputDir: "storybook-static",
  viteFinal: async (config) => {
    // Optimize dependencies for optional peer dependencies
    if (!config.optimizeDeps) {
      config.optimizeDeps = {};
    }
    config.optimizeDeps.exclude = config.optimizeDeps.exclude || [];
    config.optimizeDeps.exclude.push("hls.js");
    
    // Configure resolve to handle optional dependencies gracefully
    if (!config.resolve) {
      config.resolve = {};
    }
    
    // Add plugin to handle optional imports
    const originalPlugins = config.plugins || [];
    config.plugins = [
      ...originalPlugins,
      {
        name: "optional-deps",
        resolveId(id) {
          // Don't try to resolve optional dependencies if they don't exist
          if (id === "hls.js") {
            // Return null to let Vite handle it normally, but catch errors
            return null;
          }
        },
      },
    ];
    
    return config;
  },
};

export default config;
