/** node */
import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import crypto from 'node:crypto';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ElementPlus from 'unplugin-element-plus/vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ElementPlus({
      format: 'esm',
      defaultLocale: 'ru',
      useSource: true,
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  css: {
    modules: {
      scopeBehaviour: 'local',
      // BEM like
      generateScopedName: (name, filename, css) => {
        const filenameParsed = path.parse(filename).name;
        const filenameOnly = filenameParsed.split('.')[0];
        const filenameFirstLetterLowercased = filenameOnly[0].toLowerCase() + filenameOnly.slice(1);

        const hash = crypto.createHash('md5').update(css).digest('hex').substring(0, 5);

        return `${filenameFirstLetterLowercased}__${name}-${hash}`;
      },
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
