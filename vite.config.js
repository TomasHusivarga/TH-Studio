import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, existsSync } from 'fs';

/**
 * Custom Vite plugin that copies SEO files (robots.txt, sitemap.xml)
 * to the dist root so search engines find them at the domain root.
 * This is necessary because with base: '/TH-Studio/', Vite places public
 * files inside the subdirectory, but crawlers expect these at domain root.
 */
function copySeoFilesToRoot() {
  return {
    name: 'copy-seo-to-root',
    closeBundle() {
      const files = ['robots.txt', 'sitemap.xml', 'sitemap.txt'];
      for (const file of files) {
        const src = resolve(__dirname, 'public', file);
        const dest = resolve(__dirname, 'dist', file);
        if (existsSync(src)) {
          copyFileSync(src, dest);
          console.log(`[seo-plugin] Copied ${file} to dist root.`);
        }
      }
    },
  };
}

export default defineConfig({
  base: '/TH-Studio/', // Base URL for GitHub Pages (repo name)
  plugins: [copySeoFilesToRoot()],
  server: {
    host: true, // Expose to network
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        en: resolve(__dirname, 'en/index.html'),
        gdpr: resolve(__dirname, 'gdpr.html'),
        rehamax: resolve(__dirname, 'projects/rehamax.html'),
        donnabella: resolve(__dirname, 'projects/donnabella.html'),
        ekoprofit: resolve(__dirname, 'projects/ekoprofit.html'),
        safePlaceClinic: resolve(__dirname, 'projects/safe-place-clinic.html'),
        carepoint: resolve(__dirname, 'projects/carepoint.html'),
        humienok: resolve(__dirname, 'projects/humienok.html'),
        miningflow: resolve(__dirname, 'projects/miningflow.html'),
        ecpro: resolve(__dirname, 'projects/ecpro.html'),
        waventry: resolve(__dirname, 'projects/waventry.html'),
        viamax: resolve(__dirname, 'projects/viamax.html'),
        slovasozmyslom: resolve(__dirname, 'projects/slovasozmyslom.html'),
        modafinilCz: resolve(__dirname, 'projects/modafinil-cz.html'),
        humienokNewsletter: resolve(__dirname, 'projects/humienok-newsletter.html'),
        viamaxFooterTemplate: resolve(__dirname, 'projects/viamax-footer-template.html'),
      },
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap'],
        },
      },
    },
  }
});
