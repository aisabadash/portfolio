import svgSprite from "gulp-svg-sprite";

export const svgSprive = () => {
   return app.gulp.src(`${app.path.src.svgicons}`, {})
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "SVG",
            message: "Error: <%= error.message %>"
         })
      ))
      .pipe(svgSprite({
         mode: {
            symbol: {
               sprite: `../icons/icons.svg`,
               //Створювати таблицю з переліком іконок
               example: true
            },
            shape: {
               transform: [
                  {
                     svgo: {
                        plugins: [
                           {
                              removeAttrs: {
                                 attrs: ['class, data-name'],
                              },
                           },
                           {
                              removeUselessStrokeAndFill: false,
                           },
                           {
                              inlineStyle: true,
                           },
                        ],
                     },
                  },
               ],
            },
         },
      }))
      .pipe(app.gulp.dest(`${app.path.build.images}`));
}