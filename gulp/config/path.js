//Отримуємо імя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
   build: {
      js: `${buildFolder}/js/`,
      images: `${buildFolder}/img/`,
      css: `${buildFolder}/css/`,
      html: `${buildFolder}/`,
      files: `${buildFolder}/files/`,
      favicon: `${buildFolder}/img/favicon/`,
      fonts: `${buildFolder}/fonts/`,
   },
   src: {
      js: `${srcFolder}/js/app.js`,
      images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,avif}`,
      svg: `${srcFolder}/img/**/*.svg`,
      svgicons: `${srcFolder}/svgicons/*.svg`,
      scss: `${srcFolder}/scss/style.scss`,
      html: `${srcFolder}/*.html`,
      files: `${srcFolder}/files/**/*.*`,
      favicon: `${srcFolder}/favicon/**/*.ico`,
   },
   watch: {
      js: `${srcFolder}/js/**/*.js`,
      images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp,avif}`,
      scss: `${srcFolder}/scss/**/*.scss`,
      html: `${srcFolder}/**/*.html`,
      files: `${srcFolder}/files/**/*.*`,
      favicon: `${srcFolder}/favicon/**/*.ico`,
   },
   clean: buildFolder,
   buildFolder: buildFolder,
   srcFolder: srcFolder,
   rootFolder: rootFolder,
   ftp: ``
}