import { defineConfig } from '@rsbuild/core';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  html: {
    title: 'Math Man',
    favicon: './src/assets/images/math-man-icon.png',
  },
  plugins: [pluginSass(), pluginReact()],
});
