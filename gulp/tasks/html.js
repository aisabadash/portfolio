import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";

export const html = () => {
   return app.gulp.src(app.path.src.html)
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>"
         })
      ))
      .pipe(fileInclude())
      .pipe(app.plugins.replace(/@img\//g, 'img/'))
      .pipe(webpHtmlNosvg()) //this plugin add tag <picture> and <source> in html
      .pipe(versionNumber({
         'value': '%DT%',
         'append': {
            'key': '_v',
            'cover': 0,
            'to': [
               'css',
               'js',
            ]
         },
         'output': {
            'file': 'gulp/version.json'
         }
      })
      )
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream());
}