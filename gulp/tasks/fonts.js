import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
   //Шукаємо файли шрифтів
   return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>"
         })
      ))
      //Конвертація шрифтов в .ttf
      .pipe(fonter({
         formats: ['ttf']
      }))
      //Вигрузка у вихідну папку
      .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
   //Шукаємо файли шрифтів
   return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>"
         })
      ))
      //Конвертація шрифтов в .woff
      .pipe(fonter({
         formats: ['woff']
      }))
      //Вигрузка у вихідну папку
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))

      //пошук файлів шрифтів .ttf
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
      //Конвертація в .woff2
      .pipe(ttf2woff2())
      //Вигружаємо в папку з результатами
      .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

export const fontsStyle = () => {
   //Файли стилів підключення шрифтів
   let fontsFile = `${app.path.srcFolder}/scss/_fonts.scss`;
   //Перевірка існування файлів шрифтів
   fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
      if (fontsFiles) {
         //Перевіряємо чи існують файли стилів шрифтів
         if (!fs.existsSync(fontsFile)) {
            //Если файла нет, создаем его
            fs.writeFile(fontsFile, '', cb);
            let newFileOnly;
            for (var i = 0; i < fontsFiles.length; i++) {
               //Записуємо підключення шрифтів у файли стилів
               let fontFileName = fontsFiles[i].split('.')[0];
               if (newFileOnly !== fontFileName) {
                  let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                  let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                  console.log(fontFileName);
                  console.log(fontName);
                  console.log(fontWeight);
                  if (fontWeight.toLowerCase() === 'thin') {
                     fontWeight = 100;
                  } else if (fontWeight.toLowerCase() === 'extralight') {
                     fontWeight = 200;
                  } else if (fontWeight.toLowerCase() === 'light') {
                     fontWeight = 300;
                  } else if (fontWeight.toLowerCase() === 'medium') {
                     fontWeight = 500;
                  } else if (fontWeight.toLowerCase() === 'semibold') {
                     fontWeight = 600;
                  } else if (fontWeight.toLowerCase() === 'bold') {
                     fontWeight = 700;
                  } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                     fontWeight = 800;
                  } else if (fontWeight.toLowerCase() === 'black') {
                     fontWeight = 900;
                  } else {
                     fontWeight = 400;
                  }
                  fs.appendFile(fontsFile,
                     `@font-face {
                        font-family: ${fontName};
                        font-display: swap;
                        src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
                        font-weight: ${fontWeight};
                        font-style: normal; 
                     }\r\n`, cb);
                  newFileOnly = fontFileName;
               }
            }
         } else {
            //якщо файл існує, то виводимо повідомлення
            console.log("Файл scss/fonts.scss уже існуєю Для оновлення файла потрібно його видалити!");
         }
      }
   });
   return app.gulp.src(`${app.path.srcFolder}`);
   function cb() { }
}