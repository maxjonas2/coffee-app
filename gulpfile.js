const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");

exports.default = () => {
  gulp
    .src("./css/globals.css")
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest("dist"));
};
