import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  html: {
    title: 'Math Man',
    favicon: './src/images/math-man-icon.png',
  },
  plugins: [pluginReact()],
});
